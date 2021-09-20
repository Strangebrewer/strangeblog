import BaseAPI from './baseApi';

class SourceAPI extends BaseAPI {
  constructor() {
    super('sources');
  }
}

export default new SourceAPI();
