import express from 'express';
const router = express.Router();
import postController from '../controllers/postController';
import isAuthenticated from '../utils/isAuthenticated';

router.route('/')
  .get(isAuthenticated, postController.list)
  .post(isAuthenticated, postController.post);

router.route('/:id')
  .get(isAuthenticated, postController.getOne)
  .put(isAuthenticated, postController.put)
  .delete(isAuthenticated, postController.destroy);

export default router;
