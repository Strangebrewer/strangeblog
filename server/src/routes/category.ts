import express from 'express';
const router = express.Router();
import categoryController from '../controllers/categoryController';
import authenticate from '../utils/authenticate';
import isAdmin from '../utils/isAdmin';

router.route('/')
  .get(categoryController.list)
  .post(authenticate, isAdmin, categoryController.post);

router.route('/:id')
  .get(categoryController.getOne)
  .put(authenticate, isAdmin, categoryController.put)
  .delete(authenticate, isAdmin, categoryController.destroy);

export default router;
