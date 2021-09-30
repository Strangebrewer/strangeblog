import axios from '../plugins/axios';
import querystring from 'querystring';

const routes = {
    me: () => axios.get('users'),
    login: data => axios.post('users/login', data),
    register: data => axios.post('users', data),
    update: (data) => axios.put(`users/${data.id}`, data),
    reactivate: (email) => axios.post(`users/reactivate`, { email }),
    updateUserTags: (id, data) => axios.put(`users/tags/${id}`, data),
    adminListUsers: (query) => axios.get(`users/admin${query ? '?' + querystring.stringify(query) : ''}`),
    adminUpdateUser: (data) => axios.put(`users/admin/${data.id}`, data),
    adminDestroyUser: (id, status) => axios.delete(`users/admin/${id}/${status}`)
};

export default routes;