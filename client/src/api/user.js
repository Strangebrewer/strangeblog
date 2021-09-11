import axios from '../plugins/axios';

const routes = {
    me: () => axios.get('users'),
    login: data => axios.post('users/login', data),
    register: data => axios.post('users', data),
    update: (id, data) => axios.put(`users/${id}`, data),
    updateUserTags: (id, data) => axios.put(`users/tags/${id}`, data)
};

export default routes;