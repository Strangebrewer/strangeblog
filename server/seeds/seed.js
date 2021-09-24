import 'dotenv/config';
// import db from '../database/models';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

import categorySeed from './categories.json';
import postSeed from './posts.json';
import sourceSeed from './sources.json';
import userSeed from './users.json';

const pw = bcrypt.hashSync('1234', bcrypt.genSaltSync(10));

(async function () {
  try {
    await prisma.post.deleteMany();
    await prisma.category.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.user.deleteMany();
    await prisma.source.deleteMany();

    userSeed.forEach(user => {
      user.password = pw;
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.normalizedEmail = user.email.toLowerCase();
      user.username = user.username.toLowerCase();
    });

    await prisma.blog.create({
      data: {
        title: "we can't get there from here...",
        subtitle: "a personal blog",
        createdAt: new Date(),
        updatedAt: new Date(),
        bio: JSON.stringify([
          {
            type: 'paragraph',
            children: [
              { text: "Hello there." }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                text: "Welcome to my blawg - a collection of writings on whatever the hell I feel like. It's a repository for facts n factoids I want to remember & ideas I want to develop. It's a forum for rants, ramblings, rarities, and revelations, mine and otherwise. It's a sucker's bet, a fool's errand. How you doin?"
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                text: "I am a proponent of science, a student of the perennial philosophy, and a keeper of my own god damned counsel. Many would say I lean left, but I would say I simply want the truth. So buckle up and suck it up, cupcake - the truth may well set you free, but not until it's had its way with you."
              }
            ]
          }
        ])
      }
    });

    const blog = await prisma.blog.findMany();

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
        p.categoryId = categories[1].id;
      } else if ((i + 2) % 3 === 0) {
        p.categoryId = categories[2].id;
      } else {
        p.categoryId = categories[0].id;
      }
    });

    await prisma.post.createMany({ data: postSeed, skipDuplicates: true });
    const posts = await prisma.post.findMany();

    await prisma.source.createMany({ data: sourceSeed, skipDuplicates: true });

    await prisma.user.update({
      where: { id: users[2].id },
      data: {
        tags: posts.map((p, index) => {
          if (index === 0) return { id: p.id, tags: ["high", "low", "derp", "feck"] }
          else if (index === 3) return { id: p.id, tags: ["narf", "derp", "feck"] }
          else if (index < posts.length - 3) return { id: p.id, tags: ["derp", "feck"] }
          else return { id: p.id, tags: ["narf", "derp"] }
        })
      }
    });

    await prisma.user.update({
      where: { id: users[0].id },
      data: {
        tags: posts.map((p, index) => {
          if (index === 0) return { id: p.id, tags: ["high", "low", "derp", "feck"] }
          else if (index === 3) return { id: p.id, tags: ["narf", "derp", "feck"] }
          else if (index < posts.length - 3) return { id: p.id, tags: ["derp", "feck"] }
          else return { id: p.id, tags: ["narf", "derp"] }
        })
      }
    });

    process.exit(0);
  } catch (err) {
    console.log('err in seedDb:::', err);
    process.exit(1);
  }
})();