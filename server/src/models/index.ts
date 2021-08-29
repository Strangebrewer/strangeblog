import { PrismaClient } from '@prisma/client';
import PostModel from './post';
import UserModel from './user';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const { action, args, model } = params;
  const { data } = args;

  if (action === 'create') {
    data.created_at = new Date();
    data.updated_at = new Date();

    if (model === 'Post') {
      if (!data.subject_order) data.subject_order = '[]';
      if (!data.visible) data.visible = '[]';
    }

  }

  if (action === 'update') {
    data.updated_at = new Date();

    if (model === 'Post') {
      if (data.subject_order && typeof data.subject_order !== 'string') {
        data.subject_order = JSON.stringify(data.subject_order);
      }
      if (data.visible && typeof data.visible !== 'string') {
        data.visible = JSON.stringify(data.visible);
      }
    }
  }

  if (data) {
    if (data.id && typeof data.id === 'string') data.id = parseInt(data.id);
    if (data.subject_id && typeof data.subject_id === 'string') data.subject_id = parseInt(data.subject_id);
    if (data.project_id && typeof data.project_id === 'string') data.project_id = parseInt(data.project_id);
    if (data.user_id && typeof data.user_id === 'string') data.user_id = parseInt(data.user_id);
  }

  const result = await next(params);

  return result;
});

export const projectModel = new PostModel(prisma);
export const userModel = new UserModel(prisma);

export default prisma;
