import express from 'express';
const router = express.Router();
import sourceController from '../controllers/sourceController';
import authenticate from '../utils/authenticate';
import isAdmin from '../utils/isAdmin';

router.route('/')
  .get(sourceController.list)
  .post(authenticate, isAdmin, sourceController.post);

router.route('/:id')
  .get(sourceController.getOne)
  .put(authenticate, isAdmin, sourceController.put)
  .delete(authenticate, isAdmin, sourceController.destroy);

export default router;
