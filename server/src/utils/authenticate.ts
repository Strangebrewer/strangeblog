import { passport } from '../passport';
import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';

export default function (req: Request, res: Response, next: NextFunction): void {
   passport.authenticate('jwt', function (err: Error, user: User) {
      if (user) req.user = user;
      next();
   })(req, res, next);
}
