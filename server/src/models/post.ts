import { Post } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';

export default class PostModel {
  public constructor(private readonly client: IDatabaseClient) { }

  public async findOne(id: number): Promise<Post | null> {
    return await this.client.post.findUnique({ where: { id } });
  }

  public async findMany(query = {}): Promise<Post[]> {
    return await this.client.post.findMany({ where: query });
  }

  public async findOnePublic(id: number): Promise<Post | null> {
    return await this.client.post.findUnique({ where: { id, public: true } });
  }

  public async findPublicPosts(query = {}): Promise<Post[]> {
    return await this.client.post.findMany({ where: { ...query, public: true } });
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