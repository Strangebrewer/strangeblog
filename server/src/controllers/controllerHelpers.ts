import { Request } from 'express';
import { Post } from '@prisma/client';
import { Tag, PostPlus } from './postController';

export function getPostQueryIds(req: Request): string[] {
  let userTags: Tag[] = req.user.tags;
  const queryTags = req.query.tags as string;
  let queryTagsArray: string[];
  if (queryTags) queryTagsArray = queryTags.split(',');

  const ids = [];
  for (let i = 0; i < userTags.length; i++) {
    const uTag = userTags[i];

    let count = 0;
    for (let j = 0; j < queryTagsArray.length; j++) {
      const qTag = queryTagsArray[j].trim();
      if (uTag.tags.includes(qTag)) count++;
    }

    if (count === queryTagsArray.length) ids.push(uTag.id.toString());
  }
  return ids;
}

export function addUserTagsToPosts(data: PostPlus | Post[], tags: Tag[]): void {
  tags.forEach(tag => {
    if (Array.isArray(data)) {
      const post: PostPlus = data.find(p => p.id === tag.id);
      if (post) post.userTags = tag.tags;
    } else {
      if (data.id === tag.id) data.userTags = tag.tags;
    }
  });
}