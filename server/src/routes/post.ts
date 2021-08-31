import express from 'express';
const router = express.Router();
import postController from '../controllers/postController';
import isAuthenticated from '../utils/isAuthenticated';
import isAdmin from '../utils/isAdmin';
import isAdminOrFriend from '../utils/isAdminOrFriend';

router.get('/public', postController.listPublic);

router.get('/public/:id', postController.getOnePublic);

router.route('/')
  .get(isAuthenticated, isAdminOrFriend, postController.list)
  .post(isAuthenticated, isAdmin, postController.post);

router.route('/:id')
  .get(isAuthenticated, isAdminOrFriend, postController.getOne)
  .put(isAuthenticated, isAdmin, postController.put)
  .delete(isAuthenticated, isAdmin, postController.destroy);

export default router;
