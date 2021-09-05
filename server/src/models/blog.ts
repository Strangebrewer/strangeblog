import { Blog } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';

export default class BlogModel {
  public constructor(private readonly client: IDatabaseClient) { }

  public async findOne(id: number): Promise<Blog | null> {
    return await this.client.blog.findUnique({ where: { id } });
  }

  public async findMany(query = {}): Promise<Blog[]> {
    return await this.client.blog.findMany({
      where: query,
      select: {
        id: true,
        title: true,
        subtitle: true,
        bio: true,
        categories: true
      }
    });
  }

  public async update(id: number, data: Partial<Blog>): Promise<Blog> {
    return await this.client.blog.update({ where: { id }, data });
  }

  public async create(data: Blog): Promise<Blog> {
    return await this.client.blog.create({ data });
  }

  public async delete(id: number): Promise<Blog> {
    return await this.client.blog.delete({ where: { id } });
  }
}