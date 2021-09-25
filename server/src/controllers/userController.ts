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
      const data = await userModel.update(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.log('err in userController update:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async updateUserTags(req: Request, res: Response): Promise<void> {
    try {
      const data = await userModel.updateUserTags(req.user.id, req.body);
      res.status(200).json(data);
    } catch (err) {
      console.log('err in userController updateUserTags:::', err);
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
  },

  async adminList(req: Request, res: Response): Promise<void> {
    try {
      const users = await userModel.adminList(req.query);
      res.status(200).json(users);
    } catch (err) {
      console.log('err in userController adminList:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async adminUpdate(req: Request, res: Response): Promise<void> {
    try {
      const user = await userModel.adminUpdate(parseInt(req.params.id), req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log('err in userController adminUpdate:::', err);
      res.status(400).send({ message: err.message });
    }
  },

  async adminDeactivate(req: Request, res: Response): Promise<void> {
    try {
      const { id, status } = req.params;
      const user = await userModel.adminDeactivate(parseInt(id), status);
      res.status(200).json(user);
    } catch (err) {
      console.log('err in userController adminDestroy:::', err);
      res.status(400).send({ message: err.message });
    }
  },
}