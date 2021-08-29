import express from 'express';
const router = express.Router();
import postController from '../controllers/postController';
import isAuthenticated from '../utils/isAuthenticated';
import isAdmin from '../utils/isAdmin';

router.get('/public', postController.listPublic);

router.get('/public/:id', postController.getOnePublic);

router.route('/')
  .get(isAuthenticated, isAdmin, postController.list)
  .post(isAuthenticated, isAdmin, postController.post);

router.route('/:id')
  .get(isAuthenticated, isAdmin, postController.getOne)
  .put(isAuthenticated, isAdmin, postController.put)
  .delete(isAuthenticated, isAdmin, postController.destroy);

export default router;
