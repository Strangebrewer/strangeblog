import express from 'express';
const router = express.Router();
import blogController from '../controllers/blogController';
import isAuthenticated from '../utils/isAuthenticated';
import isAdmin from '../utils/isAdmin';

router.route('/')
  .get(blogController.list)
  .post(isAuthenticated, isAdmin, blogController.post);

router.route('/:id')
  .get(blogController.getOne)
  .put(isAuthenticated, isAdmin, blogController.put)
  .delete(isAuthenticated, isAdmin, blogController.destroy);

export default router;
