import express from 'express';
const router = express.Router();
import categoryController from '../controllers/categoryController';
import isAuthenticated from '../utils/isAuthenticated';
import isAdmin from '../utils/isAdmin';

router.route('/')
  .get(categoryController.list)
  .post(isAuthenticated, isAdmin, categoryController.post);

router.route('/:id')
  .get(categoryController.getOne)
  .put(isAuthenticated, isAdmin, categoryController.put)
  .delete(isAuthenticated, isAdmin, categoryController.destroy);

export default router;
