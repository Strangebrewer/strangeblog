import BaseAPI from './baseApi';
import axios from '../plugins/axios';

class PostAPI extends BaseAPI {
  constructor() {
    super('posts');
  }

  getOnePublicPost(id) {
    return axios.get(`${this.endpoint}/public/${id}`);
  }

  // may find this one useful...
  listPublicPosts(query) {    
    return axios.get(`${this.endpoint}/public`);
  }
}

export default new PostAPI();
