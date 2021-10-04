import path from 'path';
import express from 'express';
const router = express.Router();
import blogRoutes from './blog';
import categoryRoutes from './category';
import postRoutes from './post';
import sourceRoutes from './source';
import userRoutes from './user';
import { lstat } from 'fs';

router.use('/blogs', blogRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);
router.use('/sources', sourceRoutes);
router.use('/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
}

export default router;
