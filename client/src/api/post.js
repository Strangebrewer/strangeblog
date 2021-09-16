import BaseAPI from './baseApi';
import axios from '../plugins/axios';
import querystring from 'querystring';

class PostAPI extends BaseAPI {
  constructor() {
    super('posts');
  }

  getOnePublicPost(id) {
    return axios.get(`${this.endpoint}/public/${id}`);
  }

  // may find this one useful...
  listPublicPosts(query) {
    console.log('query:::', query);
    console.log('querystring.stringify(query):::', querystring.stringify(query));
    return axios.get(`${this.endpoint}/public${query ? '?' + querystring.stringify(query) : ''}`);
  }

  listPosts(data) {
    return axios.post(`${this.endpoint}/list`, data);
  }
}

export default new PostAPI();
