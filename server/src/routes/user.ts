import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import authenticate from '../utils/authenticate';
import isAdmin from '../utils/isAdmin';

router.route('/')
  .get(authenticate, userController.getCurrentUser)
  .post(userController.register);

router.post('/login', userController.login);

router.put('/password/:id', authenticate, userController.updatePassword);
router.put('/tags/:id', authenticate, userController.updateUserTags);

router.route('/:id')
  .put(authenticate, userController.update)
  .delete(authenticate, userController.destroy);

router.route('/admin')
  .get(authenticate, isAdmin, userController.adminList);

router.route('/admin/:id')
  .put(authenticate, isAdmin, userController.adminUpdate)

  router.route('/admin/:id/:status')
    .delete(authenticate, isAdmin, userController.adminDeactivate);

export default router;
