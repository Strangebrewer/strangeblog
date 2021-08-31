import { User } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';
import bcrypt from 'bcryptjs';
import { sign } from '../passport';

type PartialUser = {
  id: number;
  email: string;
  username: string;
};

type Tokenized = {
  token: string;
  user: PartialUser;
}

export default class UserModel {

  constructor(private readonly client: IDatabaseClient) { }

  private tokenize(user: User): Tokenized {
    const { id, email, username, acl } = user;
    const token = sign({ id, email });
    const userToReturn = { id, email, username, acl };
    return { token, user: userToReturn };
  }

  private validateEmail(email: string): void {
    const test = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
    if (!test)
      throw new Error('That is not a valid email.');
    return;
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  private checkPassword(given: string, original: string): boolean {
    return bcrypt.compareSync(given, original);
  }

  public async findOne(id: number): Promise<Tokenized> {
    const user = await this.client.user.findUnique({ where: { id } });
    if (!user) throw new Error('That user does not exist');
    return this.tokenize(user);
  }

  public async update(id: number, data = {}): Promise<User> {
    return await this.client.user.update({ where: { id }, data });
  }

  public async create(data: User): Promise<Tokenized> {
    this.validateEmail(data.email);
    data.password = this.hashPassword(data.password);
    data.normalizedEmail = data.email.toLowerCase();
    const user = await this.client.user.create({ data });
    return this.tokenize(user);
  }

  public async delete(id: number): Promise<User> {
    return await this.client.user.delete({ where: { id } });
  }

  public async login(email: string, password: string): Promise<Tokenized> {
    const user = await this.client.user.findUnique({
      where: { normalizedEmail: email.toLowerCase() }
    });
    if (!user) throw new Error('Can\'t find a user with that email');
    const passwordValid = this.checkPassword(password, user.password);
    if (passwordValid) {
      return this.tokenize(user);
    } else {
      throw new Error('That password does not match');
    }
  }
}