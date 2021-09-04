import 'dotenv/config';
// import db from '../database/models';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

import categorySeed from './categories.json';
import postSeed from './posts.json';
import userSeed from './users.json';

const pw = bcrypt.hashSync('1234', bcrypt.genSaltSync(10));

(async function () {
  try {
    await prisma.category.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    userSeed.forEach(user => {
      user.password = pw;
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.normalizedEmail = user.email.toLowerCase();
      user.username = user.username.toLowerCase();
    });

    await prisma.user.createMany({ data: userSeed, skipDuplicates: true });
    const users = await prisma.user.findMany();

    categorySeed.forEach(c => {
      c.userId = users[0].id;
    });
    await prisma.category.createMany({ data: categorySeed, skipDuplicates: true });
    const categories = await prisma.category.findMany({});

    postSeed.forEach((p, i) => {
      p.userId = users[0].id;
      p.createdAt = new Date();
      p.updatedAt = new Date();
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
      if (i % 2 === 0) {
        p.categoryId = categories[0].id;
      }
      if ((i+2) % 3 === 0) {
        p.categoryId = categories[1].id;
      }
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