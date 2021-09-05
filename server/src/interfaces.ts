import { Blog, Category, Post, User } from '@prisma/client';

export const TYPES = {
  IDatabaseClient: Symbol.for("IDatabaseClient"),
};

export interface IDatabaseClient {
  blog: {
    findUnique(query: Record<string, unknown>): Promise<Blog | null>;
    findMany(query: Record<string, unknown>): Promise<Blog[]>;
    update(query: Record<string, unknown>): Promise<Blog>;
    create(body: Record<string, unknown>): Promise<Blog>;
    delete(query: Record<string, unknown>): Promise<Blog>;
  },
  category: {
    findUnique(query: Record<string, unknown>): Promise<Category | null>;
    findMany(query: Record<string, unknown>): Promise<Category[]>;
    update(query: Record<string, unknown>): Promise<Category>;
    create(body: Record<string, unknown>): Promise<Category>;
    delete(query: Record<string, unknown>): Promise<Category>;
  },
  post: {
    findFirst(query: Record<string, unknown>): Promise<Post | null>;
    findUnique(query: Record<string, unknown>): Promise<Post | null>;
    findMany(query: Record<string, unknown>): Promise<Post[]>;
    update(query: Record<string, unknown>): Promise<Post>;
    create(body: Record<string, unknown>): Promise<Post>;
    delete(query: Record<string, unknown>): Promise<Post>;
  },
  user: {
    findFirst(query: Record<string, unknown>): Promise<User | null>;
    findUnique(query: Record<string, unknown>): Promise<User | null>;
    findMany(query: Record<string, unknown>): Promise<User[]>;
    update(query: Record<string, unknown>): Promise<User>;
    create(body: Record<string, unknown>): Promise<User>;
    delete(query: Record<string, unknown>): Promise<User>;
  }
}