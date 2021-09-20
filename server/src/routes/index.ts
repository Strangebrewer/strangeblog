import express from 'express';
const router = express.Router();
import blogRoutes from './blog';
import categoryRoutes from './category';
import postRoutes from './post';
import sourceRoutes from './source';
import userRoutes from './user';

router.use('/blogs', blogRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);
router.use('/sources', sourceRoutes);
router.use('/users', userRoutes);

export default router;
