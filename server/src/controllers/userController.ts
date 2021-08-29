import { userModel } from '../models';
import { Request, Response } from 'express';

export default {
  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) throw new Error('User could not be authenticated');
      const data = await userModel.findOne(req.user.id)
      res.status(200).json(data);
    } catch (err) {
      console.log('err in userController getCurrentUser:::', err);
      res.status(400).send({ message: err.message });
    }
  },


  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = await userModel.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      console.log('err in userController register:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = await userModel.login(req.body.email, req.body.password);
      res.status(200).json(data);
    } catch (err) {
      console.log('err in userController login:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      console.log('Hello from user update');
    } catch (err) {
      console.log('err in userController update:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      console.log('Hello from user updatePassword');
    } catch (err) {
      console.log('err in userController updatePassword:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async destroy(req: Request, res: Response): Promise<void> {
    try {
      await userModel.delete(parseInt(req.params.id));
      res.status(200).send('success');
    } catch (err) {
      console.log('err in userController destroy:::', err);
      res.status(400).send({ message: err.message });
    }
  }
}