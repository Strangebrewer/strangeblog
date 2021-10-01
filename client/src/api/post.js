import BaseAPI from './baseApi';
import axios from '../plugins/axios';

class PostAPI extends BaseAPI {
  constructor() {
    super('posts');
  }

  getOnePublicPost(id) {
    return axios.get(`${this.endpoint}/public/${id}`);
  }

  listPublicPosts(data) {
    return axios.post(`${this.endpoint}/public`, data);
  }

  // doing this as a post instead of get with querystring because
  //  it appears that dates don't get passed properly via querystring
  //  without some extra formatting, and I don't feel like doing it
  // it's a "/list" endpoint because "/" as a POST is already being used for creating a new post
  listPosts(data) {
    return axios.post(`${this.endpoint}/list`, data);
  }
}

export default new PostAPI();
