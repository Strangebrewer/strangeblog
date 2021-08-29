import { Post, User } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';
import bcrypt from 'bcryptjs';
import PostModel from './post';
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

type UserReturn = {
  token: string;
  user: PartialUser;
  posts: Post[];
}

type PublicUserReturn = {
  user: PartialUser;
  posts: Post[];
}

export default class UserModel {

  constructor(private readonly client: IDatabaseClient) { }

  private tokenize(user: User): Tokenized {
    const { id, email, username } = user;
    const token = sign({ id, email });
    const userToReturn = { id, email, username };
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

  private async getposts(query = {}): Promise<Post[]> {
    return await (new PostModel(this.client)).findMany(query);
  }

  public async findOne(id: number): Promise<UserReturn> {
    const user = await this.client.user.findUnique({ where: { id } });
    if (!user) throw new Error('That user does not exist');
    const tokenized = this.tokenize(user);
    const posts = await this.getposts({ user_id: user.id });
    return { ...tokenized, posts };
  }

  public async findMany(query = {}): Promise<User[]> {
    return await this.client.user.findMany({
      where: query,
      include: { subjects: true }
    });
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

  public async login(email: string, password: string): Promise<UserReturn> {
    const user = await this.client.user.findUnique({
      where: { normalized_email: email.toLowerCase() }
    });
    if (!user) throw new Error('Can\'t find a user with that email');
    const passwordValid = this.checkPassword(password, user.password);
    if (passwordValid) {
      const tokenized = this.tokenize(user);
      const posts = await this.getposts({ user_id: user.id });
      return { ...tokenized, posts };
    } else {
      throw new Error('That password does not match');
    }
  }

  public async getPublicProfile(username: string): Promise<PublicUserReturn> {
    let user = await this.client.user.findUnique({
      where: { username },
      include: { bio: true }
    });
    const { id, email } = user as PartialUser;
    const userToReturn = { id, email, username };
    const posts = await this.getposts({ user_id: user.id, published: true });
    return { user: userToReturn, posts };
  }
}