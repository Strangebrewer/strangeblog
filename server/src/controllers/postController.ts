import { projectModel } from '../models';
import { Request, Response } from 'express';

export default {
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const response = await projectModel.findOne(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in projectController getOne:::', err);
      res.status(400).send(err);
    }
  },

  async getPublished(req: Request, res: Response): Promise<void> {
    try {
      const query = {
        username: req.params.username,
        title_slug: req.params.slug
      };
      const response = await projectModel.findPublished(query);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in projectController getPublished:::', err);
      res.status(400).send(err);
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const query = { ...req.query, user_id: req.user?.id };
      const response = await projectModel.findMany(query);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in projectController list:::', err);
      res.status(400).send(err);
    }
  },
  
  async put(req: Request, res: Response): Promise<void> {
    try {
      const response = await projectModel.update(req.body.id, req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in projectController put:::', err);
      res.status(400).send(err);
    }
  },
  
  async post(req: Request, res: Response): Promise<void> {
    try {
      req.body.user_id = req.user?.id;
      const response = await projectModel.create(req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in projectController post:::', err);
      res.status(400).send(err);
    }
  },
  
  async destroy(req: Request, res: Response): Promise<void> {
    try {
      const response = await projectModel.delete(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in projectController destroy:::', err);
      res.status(400).send(err);
    }
  }
}
