import jwt, { Secret } from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import prisma from './models';
const { PASSPORT_SECRET } = process.env;

const sign = (payload: string | Record<string, unknown> | Buffer): string => {
   return jwt.sign(payload, PASSPORT_SECRET as Secret);
};

const options = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: PASSPORT_SECRET,
};

passport.use(new Strategy(options, async (payload, done) => {
   try {
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      return done(null, user);
   } catch (e) {
      return done(e, false);
   }
}))

export {
   sign,
   passport
}