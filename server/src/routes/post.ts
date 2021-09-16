import express from 'express';
const router = express.Router();
import postController from '../controllers/postController';
import authenticate from '../utils/authenticate';
import isAdmin from '../utils/isAdmin';
import isAdminOrFriend from '../utils/isAdminOrFriend';

router.get('/public', authenticate, postController.listPublic);

router.get('/public/:id', authenticate, postController.getOnePublic);

router.route('/')
  .get(authenticate, isAdminOrFriend, postController.list)
  .post(authenticate, isAdmin, postController.post);

router.route('/list')
  .post(authenticate, isAdminOrFriend, postController.listThisShit);

router.route('/:id')
  .get(authenticate, isAdminOrFriend, postController.getOne)
  .put(authenticate, isAdmin, postController.put)
  .delete(authenticate, isAdmin, postController.destroy);

export default router;
