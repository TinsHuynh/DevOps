import httpClient from './httpClient';

const userService = {
  fetchUsers: async () => {
    const response = await httpClient.get('/users');
    return response.data;
  },
  updateUser: async (id, payload) => {
    const response = await httpClient.put(`/users/${id}`, payload);
    return response.data;
  },
};

export default userService;
