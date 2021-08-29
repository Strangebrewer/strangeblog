import express from 'express';
const router = express.Router();
import isAuthenticated from '../utils/isAuthenticated';
import userController from '../controllers/userController';

router.route('/')
  .get(isAuthenticated, userController.getCurrentUser)
  .post(userController.register);

router.post('/login', userController.login);

router.put('/password/:id', isAuthenticated, userController.updatePassword);

router.route('/:id')
  .put(isAuthenticated, userController.update)
  .delete(isAuthenticated, userController.destroy);

export default router;
