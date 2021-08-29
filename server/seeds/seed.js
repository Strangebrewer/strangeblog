import 'dotenv/config';
// import db from '../database/models';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

import postSeed from './posts.json';
import userSeed from './users.json';

const pw = bcrypt.hashSync('1234', bcrypt.genSaltSync(10));

(async function () {
  try {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    userSeed.forEach(user => {
      user.password = pw;
      user.normalizedEmail = user.email.toLowerCase();
      user.username = user.username.toLowerCase();
    });

    await prisma.user.createMany({ data: userSeed, skipDuplicates: true });
    const users = await prisma.user.findMany();

    postSeed.forEach(p => {
      p.userId = users[0].id;
      p.body = JSON.stringify(p.body.split('?%?').map(p => {
        return {
          "type": "paragraph",
          "children": [
            {
              "text": p
            }
          ]
        }
      }));
    });

    await prisma.post.createMany({ data: postSeed, skipDuplicates: true });
    const posts = await prisma.post.findMany();

    await prisma.user.update({
      where: { id: users[2].id },
      data: { tags: [
        { id: posts[0].id, tags: ["high", "low"] },
        { id: posts[3].id, tags: ["left", "right"] }
      ]}
    });

    process.exit(0);
  } catch (err) {
    console.log('err in seedDb:::', err);
    process.exit(1);
  }
})();