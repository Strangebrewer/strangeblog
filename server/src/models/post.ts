import { Post, User } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';

type PublishedQuery = {
  username?: string;
  title?: string;
  id?: number;
}

export default class PostModel {
  public constructor(private readonly client: IDatabaseClient) { }

  public async findOne(id: number): Promise<Post | null> {
    return await this.client.post.findUnique({
      where: { id },
      include: { subjects: true, texts: true }
    });
  }

  public async findPublished(query: PublishedQuery): Promise<{ post: Post, user: Partial<User> }> {
    const user = await this.client.user.findFirst({
      where: { username: query.username }
    });

    if (!user) throw new Error("Could not find a user with that username");

    const post = await this.client.post.findFirst({
      where: {
        user_id: user.id,
        title: query.title,
        published: true
      }
    });

    if (!post) throw Error("There is no published post with that name");

    return {
      post,
      user: {
        id: user.id,
        username: user.username
      }
    };
  }

  public async findMany(query = {}): Promise<Post[]> {
    return await this.client.post.findMany({
      where: query,
      include: { subjects: true }
    });
  }

  public async update(id: number, data: Partial<Post>): Promise<Post> {
    return await this.client.post.update({ where: { id }, data });
  }

  public async create(data: Post): Promise<Post> {
    return await this.client.post.create({ data });
  }

  public async delete(id: number): Promise<Post> {
    return await this.client.post.delete({ where: { id } });
  }
}