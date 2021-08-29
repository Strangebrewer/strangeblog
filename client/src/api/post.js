import BaseAPI from './baseApi';
import axios from '../plugins/axios';

class PostAPI extends BaseAPI {
  constructor() {
    super('posts');
  }

  // may find this one useful...
  getPublished(query) {    
    return axios.get(`${this.endpoint}/${query.username}/${query.slug}`);
  }
}

export default new PostAPI();
