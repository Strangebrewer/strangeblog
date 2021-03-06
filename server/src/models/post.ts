import { Post } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';

interface IInitialData {
  categoryId?: string;
  tags?: string;
  title?: string;
  byDate?: boolean;
  startDate?: string;
  endDate?: string;
  skip?: string;
  take?: string;
  orderBy?: string;
  order?: string;
  byUserTag?: boolean;
  ids?: string[];
}

interface ISearch {
  categoryId?: number;
  tags?: Record<string, unknown>;
  title?: Record<string, unknown>;
  id?: Record<string, unknown>;
  createdAt?: Record<string, unknown>;
  AND?: Record<string, unknown>[]
}

interface IOptions {
  skip?: number;
  take?: number;
  orderBy?: Record<string, unknown>;
  include?: Record<string, unknown>;
}

export default class PostModel {
  public constructor(private readonly client: IDatabaseClient) { }

  public async findOne(id: number): Promise<Post | null> {
    return await this.client.post.findUnique({ where: { id } });
  }

  public async findOnePublic(id: number): Promise<Post | null> {
    return await this.client.post.findFirst({ where: { id, public: true } });
  }

  public async findManyPublic(data: IInitialData = {}): Promise<{ posts: Post[], count: number }> {
    const { search, options } = this.buildQuery(data);
    const posts = await this.client.post.findMany({
      where: { ...search, public: true },
      ...options
    });
    const count = await this.client.post.count({ where: { ...search, public: true } });
    return { posts, count };
  }

  public async findMany(data: IInitialData = {}): Promise<{ posts: Post[], count: number }> {
    const { search, options } = this.buildQuery(data);
    const posts = await this.client.post.findMany({
      where: { ...search },
      ...options
    });
    const count = await this.client.post.count({ where: { ...search } });
    return { posts, count };
  }

  public async update(id: number, data: Partial<Post>): Promise<Post> {
    return await this.client.post.update({ where: { id }, data, include: { category: true } });
  }

  public async create(data: Post): Promise<Post> {
    return await this.client.post.create({ data, include: { category: true } });
  }

  public async delete(id: number): Promise<Post> {
    return await this.client.post.delete({ where: { id } });
  }

  private buildQuery(data: IInitialData = {}): { search: ISearch, options: IOptions } {
    const search: ISearch = {};
    if (data.ids && data.ids.length) {
      const ids = data.ids.map(id => parseInt(id));
      search.id = { in: ids }
    }

    // if data.byUserTag, the above conditional will catch it
    //  because there will be data.ids;
    if (data.tags && !data.byUserTag) {
      let tags = data.tags.split(',');
      tags = tags.map(tag => tag.trim());
      search.tags = { hasEvery: tags };
    }

    if (data.byDate) {
      if (data.startDate && !data.endDate) {
        search.createdAt = { gte: new Date(data.startDate) };
      } else if (!data.startDate && data.endDate) {
        search.createdAt = { lte: new Date(data.endDate) };
      } else if (data.startDate && data.endDate) {
        search.AND = [
          { createdAt: { gte: new Date(data.startDate) } },
          { createdAt: { lte: new Date(data.endDate) } }
        ]
      }
    }
    if (data.categoryId) search.categoryId = parseInt(data.categoryId);
    if (data.title) search.title = { contains: data.title, mode: 'insensitive' };

    const options: IOptions = { include: { category: true } };
    if (data.skip) options.skip = parseInt(data.skip);
    if (data.take) options.take = parseInt(data.take);
    if (data.orderBy) options.orderBy = { [data.orderBy]: data.order };

    return { search, options };
  }
}