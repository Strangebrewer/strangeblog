import axios from '../plugins/axios';
import querystring from 'querystring';

export default class BaseAPI {
    constructor (endpoint) {
        this.endpoint = endpoint;
    }

    get(query) {
        return axios.get(`${this.endpoint}${query ? '?' + querystring.stringify(query) : ''}`);
    }

    getOne(id, query) {
        return axios.get(`${this.endpoint}/${id}${query ? '?' + querystring.stringify(query) : ''}`);
    }

    create(item) {
        return axios.post(`${this.endpoint}`, item);
    }

    edit(item) {
        return axios.put(`${this.endpoint}/${item.id}`, item);
    }

    destroy(id) {
        return axios.delete(`${this.endpoint}/${id}`);
    }
}