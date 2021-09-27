import { postModel } from '../models';
import { Request, Response } from 'express';
import { Post } from '@prisma/client';
import { getPostQueryIds, addUserTagsToPosts } from './controllerHelpers';

export type Tag = {
  id: number;
  tags: string[];
}

export interface PostPlus extends Post {
  userTags?: string[]
}

export default {
  async getOnePublic(req: Request, res: Response): Promise<void> {
    try {
      const post: PostPlus = await postModel.findOnePublic(parseInt(req.params.id));
      if (req.user) addUserTagsToPosts(post, req.user.tags);
      res.status(200).json(post);
    } catch (err) {
      console.log('err in postController getOnePublic:::', err);
      res.status(400).send(err);
    }
  },

  async listPublic(req: Request, res: Response): Promise<void> {
    try {
      if (req.user && req.query.byUserTag) req.query.ids = getPostQueryIds(req);
      const response = await postModel.findManyPublic(req.query);
      if (req.user) addUserTagsToPosts(response.posts, req.user.tags);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController listPublic:::', err);
      res.status(400).send(err);
    }
  },

  // async OGlist(req: Request, res: Response): Promise<void> {
  //   try {
  //     if (req.query.byUserTag) req.query.ids = getPostQueryIds(req);
  //     const response = await postModel.findMany(req.query);
  //     addUserTagsToPosts(response.posts, req.user.tags);
  //     res.status(200).json(response);
  //   } catch (err) {
  //     console.log('err in postController list:::', err);
  //     res.status(400).send(err);
  //   }
  // },

  async list(req: Request, res: Response): Promise<void> {
    console.log('hello from listThisShit');
    try {
      if (req.body.byUserTag) req.body.ids = getPostQueryIds(req);
      const response = await postModel.findMany(req.body);
      addUserTagsToPosts(response.posts, req.user.tags);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController listThisShit:::', err);
      res.status(400).send(err);
    }
  },

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const post: PostPlus = await postModel.findOne(parseInt(req.params.id));
      addUserTagsToPosts(post, req.user.tags);
      res.status(200).json(post);
    } catch (err) {
      console.log('err in postController getOne:::', err);
      res.status(400).send(err);
    }
  },

  async put(req: Request, res: Response): Promise<void> {
    try {
      const post: PostPlus = await postModel.update(req.body.id, req.body);
      addUserTagsToPosts(post, req.user.tags);
      res.status(201).json(post);
    } catch (err) {
      console.log('err in postController put:::', err);
      res.status(400).send(err);
    }
  },

  async post(req: Request, res: Response): Promise<void> {
    try {
      req.body.userId = req.user.id;
      const response = await postModel.create(req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in postController post:::', err);
      res.status(400).send(err);
    }
  },

  async destroy(req: Request, res: Response): Promise<void> {
    try {
      const response = await postModel.delete(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController destroy:::', err);
      res.status(400).send(err);
    }
  }
}
