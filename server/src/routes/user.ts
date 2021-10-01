import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import authenticate from '../utils/authenticate';
import isAdmin from '../utils/isAdmin';

router.route('/')
  .get(authenticate, userController.getCurrentUser)
  .post(userController.register);

router.post('/login', userController.login);

router.post('/reactivate', userController.reactivate);

router.put('/tags/:id', authenticate, userController.updateUserTags);

router.route('/admin')
  .get(authenticate, isAdmin, userController.adminList);

router.route('/admin/:id')
  .put(authenticate, isAdmin, userController.adminUpdate)
  .delete(authenticate, isAdmin, userController.adminDelete);

router.route('/admin/:id/:status')
  .put(authenticate, isAdmin, userController.adminDeactivate);

router.route('/:id')
  .put(authenticate, userController.update);

export default router;
