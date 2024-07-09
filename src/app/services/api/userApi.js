import { axiosClient } from "../axiosClient";

export const userApi = {
  login: ({ email, password }) =>
    axiosClient.post("/auth/signin", { email, password }),
  getUser: (id) => axiosClient.get(`/users/${id}`),
  getUsers: () => axiosClient.get("users"),
  createUser: (userData) => axiosClient.post("/users", userData),
  updateUser: (id, userData) => axiosClient.put(`/users/${id}`, userData),
  deleteUser: (id) => axiosClient.delete(`/users?id=${id}`),
  searchUser: (name) => axiosClient.get(`/users/search/${name}`),
  uploadAvatar: () => axiosClient.post("/users/upload-avatar"),
};
