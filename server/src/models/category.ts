import { Category } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';

export default class CategoryModel {
  public constructor(private readonly client: IDatabaseClient) { }

  public async findOne(id: number): Promise<Category | null> {
    return await this.client.category.findUnique({ where: { id } });
  }

  public async findMany(query = {}): Promise<Category[]> {
    return await this.client.category.findMany({ where: query });
  }

  public async update(id: number, data: Partial<Category>): Promise<Category> {
    return await this.client.category.update({ where: { id }, data });
  }

  public async create(data: Category): Promise<Category> {
    return await this.client.category.create({ data });
  }

  public async delete(id: number): Promise<Category> {
    return await this.client.category.delete({ where: { id } });
  }
}