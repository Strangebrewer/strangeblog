import { postModel, userModel } from '../models';
import { Request, Response } from 'express';
import { Post } from '@prisma/client';

export type Tag = {
  id: number;
  tags: string[];
}

interface PostPlus extends Post {
  userTags?: string[]
}

export default {
  async getOnePublic(req: Request, res: Response): Promise<void> {
    try {
      const post: PostPlus = await postModel.findOnePublic(parseInt(req.params.id));

      if (req.user) {
        const tags: Tag[] = req.user.tags;
        tags.forEach(tag => {
          if (post.id === tag.id) post.userTags = tag.tags;
        });
      }
      res.status(200).json(post);
    } catch (err) {
      console.log('err in postController getOnePublic:::', err);
      res.status(400).send(err);
    }
  },

  async listPublic(req: Request, res: Response): Promise<void> {
    try {
      let userTags: Tag[];

      if (req.user && req.query.byUserTag) {
        userTags = req.user.tags;
        const queryTags = req.query.tags as string;
        let queryTagsArray: string[];
        if (queryTags) queryTagsArray = queryTags.split(',');
        const ids = [];
        for (let i = 0; i < userTags.length; i++) {
          const uTag = userTags[i];
          let count = 0;
          for (let j = 0; j < queryTagsArray.length; j++) {
            const qTag = queryTagsArray[j].trim();
            if (uTag.tags.includes(qTag)) count++;
          }
          if (count === queryTagsArray.length) ids.push(uTag.id.toString());
          req.query.ids = ids;
        }
      }

      const response = await postModel.findManyPublic(req.query);

      if (req.user) {
        userTags = req.user.tags;
        userTags.forEach(tag => {
          const post: PostPlus = response.posts.find(p => p.id === tag.id);
          if (post) post.userTags = tag.tags;
        });
      }

      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController listPublic:::', err);
      res.status(400).send(err);
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {

      const queryTags = req.query.tags as string;
      let queryTagsArray: string[];
      if (queryTags) queryTagsArray = queryTags.split(',');
      const userTags: Tag[] = req.user.tags;

      if (req.query.byUserTag) {
        const ids = [];
        for (let i = 0; i < userTags.length; i++) {
          const uTag = userTags[i];
          let count = 0;
          for (let j = 0; j < queryTagsArray.length; j++) {
            const qTag = queryTagsArray[j].trim();
            if (uTag.tags.includes(qTag)) count++;
          }
          if (count === queryTagsArray.length) ids.push(uTag.id.toString());
          req.query.ids = ids;
        }
      }

      const response = await postModel.findMany(req.query);

      const tags: Tag[] = req.user.tags;
      tags.forEach(tag => {
        const post: PostPlus = response.posts.find(p => p.id === tag.id);
        if (post) post.userTags = tag.tags;
      });

      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController list:::', err);
      res.status(400).send(err);
    }
  },

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const post: PostPlus = await postModel.findOne(parseInt(req.params.id));

      const tags: Tag[] = req.user.tags;
      tags.forEach(tag => {
        if (post.id === tag.id) post.userTags = tag.tags;
      });

      res.status(200).json(post);
    } catch (err) {
      console.log('err in postController getOne:::', err);
      res.status(400).send(err);
    }
  },

  async put(req: Request, res: Response): Promise<void> {
    try {
      const response = await postModel.update(req.body.id, req.body);
      res.status(201).json(response);
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
