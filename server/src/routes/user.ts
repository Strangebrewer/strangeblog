import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import authenticate from '../utils/authenticate';

router.route('/')
  .get(authenticate, userController.getCurrentUser)
  .post(userController.register);

router.post('/login', userController.login);

router.put('/password/:id', authenticate, userController.updatePassword);
router.put('/tags/:id', authenticate, userController.updateUserTags);

router.route('/:id')
  .put(authenticate, userController.update)
  .delete(authenticate, userController.destroy);

export default router;
