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
    adminDeactivateUser: (id, status) => axios.put(`users/admin/${id}/${status}`),
    adminDeleteUser: id => axios.delete(`users/admin/${id}`)
};

export default routes;