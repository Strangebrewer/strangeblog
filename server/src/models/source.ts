import { Source } from '@prisma/client';
import { IDatabaseClient } from '../interfaces';

export default class SourceModel {
  public constructor(private readonly client: IDatabaseClient) { }

  public async findOne(id: number): Promise<Source | null> {
    return await this.client.source.findUnique({ where: { id } });
  }

  public async findMany(query = {}): Promise<Source[]> {
    return await this.client.source.findMany({ where: query });
  }

  public async update(id: number, data: Partial<Source>): Promise<Source> {
    return await this.client.source.update({ where: { id }, data });
  }

  public async create(data: Source): Promise<Source> {
    return await this.client.source.create({ data });
  }

  public async delete(id: number): Promise<Source> {
    return await this.client.source.delete({ where: { id } });
  }
}