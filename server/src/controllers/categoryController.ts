import { categoryModel } from '../models';
import { Request, Response } from 'express';

export default {
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const response = await categoryModel.findOne(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in categoryController getOne:::', err);
      res.status(400).send(err);
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const response = await categoryModel.findMany(req.query);
      res.status(200).json(response);
    } catch (err) {
      console.log('err in categoryController list:::', err);
      res.status(400).send(err);
    }
  },
  
  async put(req: Request, res: Response): Promise<void> {
    try {
      const response = await categoryModel.update(req.body.id, req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in categoryController put:::', err);
      res.status(400).send(err);
    }
  },
  
  async post(req: Request, res: Response): Promise<void> {
    try {
      req.body.userId = req.user.id;
      const response = await categoryModel.create(req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log('err in categoryController post:::', err);
      res.status(400).send(err);
    }
  },
  
  async destroy(req: Request, res: Response): Promise<void> {
    try {
      const response = await categoryModel.delete(parseInt(req.params.id));
      res.status(200).json(response);
    } catch (err) {
      console.log('err in categoryController destroy:::', err);
      res.status(400).send(err);
    }
  }
}
