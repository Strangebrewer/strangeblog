import { Post } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';

interface IInitialData {
  category?: string;
  tags?: string;
  title?: string;
  skip?: string;
  take?: string;
  orderBy?: string;
  order?: string;
  byUserTag?: boolean;
  ids?: string[];
}

interface ISearch {
  category?: string;
  tags?: Record<string, unknown>;
  title?: Record<string, unknown>;
  id?: Record<string, unknown>;
}

interface IOptions {
  skip?: number;
  take?: number;
  orderBy?: Record<string, unknown>;
}

export default class PostModel {
  public constructor(private readonly client: IDatabaseClient) { }

  private buildQuery(data: IInitialData = {}): { search: ISearch, options: IOptions } {
    const search: ISearch = {};
    if (data.ids && data.ids.length) {
      const ids = data.ids.map(id => parseInt(id));
      search.id = { in: ids }
    }
    if (data.tags && !data.byUserTag) search.tags = { hasEvery: data.tags.split(',') };
    if (data.category) search.category = data.category;
    if (data.title) search.title = { contains: data.title, mode: 'insensitive' };

    const options: IOptions = {};
    if (data.skip) options.skip = parseInt(data.skip);
    if (data.take) options.take = parseInt(data.take);
    if (data.orderBy) options.orderBy = { [data.orderBy]: data.order };

    return { search, options };
  }

  public async findOne(id: number): Promise<Post | null> {
    return await this.client.post.findUnique({ where: { id } });
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

  public async findOnePublic(id: number): Promise<Post | null> {
    return await this.client.post.findUnique({ where: { id, public: true } });
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