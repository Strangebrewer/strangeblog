import { User } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';
import bcrypt from 'bcryptjs';
import { sign } from '../passport';

type PartialUser = {
  id: number;
  email: string;
  username: string;
  acl: string
};

type Tokenized = {
  token: string;
  user: PartialUser;
}

export default class UserModel {
  private readonly select = {
    id: true,
    email: true,
    username: true,
    acl: true
  }

  constructor(private readonly client: IDatabaseClient) { }

  private tokenize(user: User): Tokenized {
    const token = sign({ id: user.id, email: user.email });
    return { token, user };
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

  public async getUserTags(userId: number): Promise<User> {
    return await this.client.user.findUnique({
      where: { id: userId },
      select: { tags: true }
    })
  }

  public async findOne(id: number): Promise<Tokenized> {
    const user = await this.client.user.findUnique({
      where: { id },
      select: this.select
    });
    if (!user) throw new Error('That user does not exist');
    return this.tokenize(user);
  }

  public async update(id: number, data = {}): Promise<User> {
    return await this.client.user.update({
      where: { id },
      data,
      select: this.select
    });
  }

  public async create(data: User): Promise<Tokenized> {
    this.validateEmail(data.email);
    data.password = this.hashPassword(data.password);
    data.normalizedEmail = data.email.toLowerCase();
    const user = await this.client.user.create({
      data,
      select: this.select
    });
    return this.tokenize(user);
  }

  public async delete(id: number): Promise<User> {
    return await this.client.user.delete({ where: { id } });
  }

  public async login(email: string, password: string): Promise<Tokenized> {
    let user = await this.client.user.findUnique({
      where: { normalizedEmail: email.toLowerCase() }
    });
    console.log('user in login:::', user);
    if (!user) throw new Error('Can\'t find a user with that email');
    const passwordValid = this.checkPassword(password, user.password);
    if (passwordValid) {
      user = await this.client.user.findUnique({
        where: { normalizedEmail: email.toLowerCase() },
        select: this.select
      });
      return this.tokenize(user);
    } else {
      throw new Error('That password does not match');
    }
  }
}