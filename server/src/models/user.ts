import { User } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';
import bcrypt from 'bcryptjs';
import { sign } from '../passport';

type PartialUser = {
  id: number;
  email: string;
  username: string;
  acl?: string[];
};

type Tokenized = {
  token: string;
  user: PartialUser;
}

type UserTag = {
  id: number;
  tags: string[];
}

interface IInitialData {
  username?: string;
  email?: string;
  acl?: string[];
  status?: string;
  password?: string;
  resetPassword?: boolean;
  addFriend?: boolean;
  removeFriend?: boolean;
  skip?: string;
  take?: string;
  orderBy?: string;
  order?: string;
}

interface IUserSearch {
  username?: Record<string, unknown>;
  email?: Record<string, unknown>;
  acl?: Record<string, unknown>;
  status?: string;
  AND?: Record<string, unknown>[]
}

interface IUserOptions {
  select: Record<string, unknown>;
  skip?: number;
  take?: number;
  orderBy?: Record<string, unknown>;
  include?: Record<string, unknown>;
}

export default class UserModel {
  private readonly select = {
    id: true,
    email: true,
    username: true,
    acl: true
  }

  constructor(private readonly client: IDatabaseClient) { }

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

  public async updateUserTags(userId: number, data: UserTag) {
    const user = await this.client.user.findUnique({ where: { id: userId } });
    const tags = user.tags ? [...user.tags] : [];
    const index = tags.findIndex((tag: UserTag) => tag.id === data.id);
    tags.splice(index, 1, data);
    return this.update(userId, { tags });
  }

  public async create(data: User): Promise<Tokenized> {
    this.validateEmail(data.email);

    const emailExists = await this.client.user.findUnique({ where: { email: data.email } });
    if (emailExists) {
      throw new Error('An account already exists with that email address');
    }

    const userNameExists = await this.client.user.findUnique({ where: { username: data.username } });
    if (userNameExists) {
      throw new Error('That username has already been taken');
    }


    data.password = this.hashPassword(data.password);
    data.normalizedEmail = data.email.toLowerCase();

    const user = await this.client.user.create({
      data,
      select: this.select
    });

    return this.tokenize(user);
  }

  public async delete(id: number): Promise<User> {
    return await this.client.user.update({ where: { id }, data: { status: 'inactive' } });
  }

  public async login(email: string, password: string): Promise<Tokenized> {
    let user = await this.client.user.findUnique({
      where: { normalizedEmail: email.toLowerCase() }
    });

    if (!user) throw new Error('Can\'t find a user with that email');

    const passwordValid = this.checkPassword(password, user.password);
    if (passwordValid) {
      if (user.status === 'banned') {
        throw new Error('That account has been banned.')
      } else if (user.status === 'inactive') {
        throw new Error('That account is inactive. Would you like to reactivate it?')
      } else {
        user = await this.client.user.findUnique({
          where: { normalizedEmail: email.toLowerCase() },
          select: this.select
        });
      }

      return this.tokenize(user);
    } else {
      throw new Error('That password does not match');
    }
  }

  public async reactivate(email: string) : Promise<Tokenized> {
    let user = await this.client.user.update({
      where: { email },
      data: { status: 'active' },
      select: this.select
    });

    return this.tokenize(user);
  }

  public async adminList(data: IInitialData): Promise<{ users: User[], count: number }> {
    const { search, options } = this.buildQuery(data);
    const users = await this.client.user.findMany({
      where: search,
      ...options
    });
    const count = await this.client.user.count({ where: search });
    return { users, count };
  }

  public async adminUpdate(id: number, data: IInitialData): Promise<User> {
    if (data.password) data.password = this.hashPassword(data.password);
    if (data.resetPassword) data.password = this.hashPassword('1234');
    if (data.addFriend || data.removeFriend) {
      const user = await this.client.user.findUnique({ where: { id } });
      if (data.addFriend) {
        if (!user.acl.includes('friend')) data.acl = [...user.acl, 'friend'];
        delete data.addFriend;
      }
      if (data.removeFriend) {
        if (user.acl.includes('friend')) data.acl = user.acl.filter(u => u !== 'friend');
        delete data.removeFriend;
      }
    }
    delete data.resetPassword;
    const { options } = this.buildQuery(data);
    return await this.client.user.update({ where: { id }, data, ...options });
  }

  public async adminDeactivate(id: number, status: string): Promise<User> {
    const { options } = this.buildQuery({});
    return await this.client.user.update({
      where: { id },
      data: { status },
      ...options
    });
  }

  private tokenize(user: User): Tokenized {
    const token = sign({ id: user.id, email: user.email });
    return { token, user };
  }

  private validateEmail(email: string): void {
    const test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
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

  private buildQuery(data: IInitialData = {}): { search: IUserSearch, options: IUserOptions } {
    const search: IUserSearch = {};
    if (data.username) search.username = { contains: data.username, mode: 'insensitive' };
    if (data.email) search.email = { contains: data.email, mode: 'insensitive' };
    if (data.status) search.status = data.status;
    if (data.acl) search.acl = { has: data.acl };

    const options: IUserOptions = {
      select: {
        ...this.select,
        tags: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    };
    if (data.skip) options.skip = parseInt(data.skip);
    if (data.take) options.take = parseInt(data.take);
    if (data.orderBy) options.orderBy = { [data.orderBy]: data.order };

    return { search, options };
  }
}