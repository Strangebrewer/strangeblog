import { passport } from '../passport';
import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';

export default function (req: Request, res: Response, next: NextFunction): void {
   passport.authenticate('jwt', function (err: Error, user: User) {
      if (err || !user) {
         res.status(403).send({
            error: 'You do not have access to this resource.'
         });
      } else {
         req.user = user;
         next();
      }
   })(req, res, next);
}
