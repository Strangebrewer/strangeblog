import BaseAPI from './baseApi';

class BlogAPI extends BaseAPI {
  constructor() {
    super('blogs');
  }
}

export default new BlogAPI();
