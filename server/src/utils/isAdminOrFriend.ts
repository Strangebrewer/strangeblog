import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction): void {
   const { acl } = req.user;
   if (acl === 'admin' || acl === 'friend') {
      next();
   } else {
      res.status(403).send({
         error: 'You do not have access to this resource.'
      });
   }
}