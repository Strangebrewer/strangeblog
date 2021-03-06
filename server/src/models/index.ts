import { PrismaClient } from '@prisma/client';
import BlogModel from './blog';
import CategoryModel from './category';
import PostModel from './post';
import SourceModel from './source';
import UserModel from './user';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const { action, args, model } = params;
  const { data } = args;

  if (action === 'create') {
    data.createdAt = new Date();
    data.updatedAt = new Date();
  }

  if (action === 'update') {
    data.updatedAt = new Date();
  }

  if (data) {
    if (data.id && typeof data.id === 'string') data.id = parseInt(data.id);
    if (data.blogId && typeof data.blogId === 'string') data.blogId = parseInt(data.blogId);
    if (data.categoryId && typeof data.categoryId === 'string') data.categoryId = parseInt(data.categoryId);
    if (data.userId && typeof data.userId === 'string') data.userId = parseInt(data.userId);
  }

  const result = await next(params);

  return result;
});

export const blogModel = new BlogModel(prisma);
export const categoryModel = new CategoryModel(prisma);
export const postModel = new PostModel(prisma);
export const sourceModel = new SourceModel(prisma);
export const userModel = new UserModel(prisma);

export default prisma;
