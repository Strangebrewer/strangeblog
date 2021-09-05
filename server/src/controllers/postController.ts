import { postModel } from '../models';
import { Request, Response } from 'express';

export default {
  async getOnePublic(req: Request, res: Response): Promise<void> {
    try {
      const response = await postModel.findOnePublic(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController getOnePublic:::', err);
      res.status(400).send(err);
    }
  },

  async listPublic(req: Request, res: Response): Promise<void> {
    try {
      console.log('req.query:::', req.query);
      const response = await postModel.findPublicPosts(req.query);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController listPublic:::', err);
      res.status(400).send(err);
    }
  },

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const response = await postModel.findOne(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController getOne:::', err);
      res.status(400).send(err);
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const response = await postModel.findMany(req.query);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in postController list:::', err);
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
