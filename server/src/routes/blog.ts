import express from 'express';
const router = express.Router();
import blogController from '../controllers/blogController';
import authenticate from '../utils/authenticate';
import isAdmin from '../utils/isAdmin';

router.route('/')
  .get(blogController.list)
  .post(authenticate, isAdmin, blogController.post);

router.route('/:id')
  .get(blogController.getOne)
  .put(authenticate, isAdmin, blogController.put)
  .delete(authenticate, isAdmin, blogController.destroy);

export default router;
