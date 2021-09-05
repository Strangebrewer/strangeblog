import BaseAPI from './baseApi';

class CategoryAPI extends BaseAPI {
  constructor() {
    super('categories');
  }
}

export default new CategoryAPI();
