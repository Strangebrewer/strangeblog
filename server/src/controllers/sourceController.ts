import { sourceModel } from '../models';
import { Request, Response } from 'express';

export default {
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const response = await sourceModel.findOne(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in sourceController getOne:::', err);
      res.status(400).send(err);
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const response = await sourceModel.findMany(req.query);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in sourceController list:::', err);
      res.status(400).send(err);
    }
  },
  
  async put(req: Request, res: Response): Promise<void> {
    try {
      const response = await sourceModel.update(req.body.id, req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in sourceController put:::', err);
      res.status(400).send(err);
    }
  },
  
  async post(req: Request, res: Response): Promise<void> {
    try {
      const response = await sourceModel.create(req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in sourceController post:::', err);
      res.status(400).send(err);
    }
  },
  
  async destroy(req: Request, res: Response): Promise<void> {
    try {
      const response = await sourceModel.delete(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in sourceController destroy:::', err);
      res.status(400).send(err);
    }
  }
}
