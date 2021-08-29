import { Post, User } from '@prisma/client';

export const TYPES = {
  IDatabaseClient: Symbol.for("IDatabaseClient"),
};

export interface IClientQuery {
  [fieldName: string]: unknown;
}

export interface IDatabaseClient {
  post: {
    findFirst(query: IClientQuery): Promise<Post | null>;
    findUnique(query: IClientQuery): Promise<Post | null>;
    findMany(query: IClientQuery): Promise<Post[]>;
    update(query: IClientQuery): Promise<Post>;
    create(body: IClientQuery): Promise<Post>;
    delete(query: IClientQuery): Promise<Post>;
  },
  user: {
    findFirst(query: IClientQuery): Promise<User | null>;
    findUnique(query: IClientQuery): Promise<User | null>;
    findMany(query: IClientQuery): Promise<User[]>;
    update(query: IClientQuery): Promise<User>;
    create(body: IClientQuery): Promise<User>;
    delete(query: IClientQuery): Promise<User>;
  }
}