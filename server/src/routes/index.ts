import express from 'express';
const router = express.Router();
import postRoutes from './post';
import userRoutes from './user';

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

export default router;
