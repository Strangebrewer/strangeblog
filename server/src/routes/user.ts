import express from 'express';
const router = express.Router();
import isAuthenticated from '../utils/isAuthenticated';
import userController from '../controllers/userController';

router.route('/')
  .get(isAuthenticated, userController.getCurrentUser)
  .put(userController.update)
  .post(userController.register);

router.post('/login', userController.login);

router.route('/profile/:username')
  .get(userController.getPublicProfile);

router.route('/:id')
  .put(userController.updatePassword)
  .delete(userController.destroy);

export default router;
