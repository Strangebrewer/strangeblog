import { blogModel } from '../models';
import { Request, Response } from 'express';

export default {
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const response = await blogModel.findOne(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in blogController getOne:::', err);
      res.status(400).send(err);
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const response = await blogModel.findMany(req.query);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in blogController list:::', err);
      res.status(400).send(err);
    }
  },
  
  async put(req: Request, res: Response): Promise<void> {
    try {
      const response = await blogModel.update(req.body.id, req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in blogController put:::', err);
      res.status(400).send(err);
    }
  },
  
  async post(req: Request, res: Response): Promise<void> {
    try {
      req.body.userId = req.user.id;
      const response = await blogModel.create(req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in blogController post:::', err);
      res.status(400).send(err);
    }
  },
  
  async destroy(req: Request, res: Response): Promise<void> {
    try {
      const response = await blogModel.delete(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in blogController destroy:::', err);
      res.status(400).send(err);
    }
  }
}
