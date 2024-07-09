import { axiosClient } from "../axiosClient";

export const bookingApi = {
  gets: () => axiosClient.get("/dat-phong"),
  get: (id) => axiosClient.get(`/dat-phong/${id}`),
  put: (id, data) => axiosClient.put(`/dat-phong/${id}`, data),
  delete: (id) => axiosClient.delete(`/dat-phong/${id}`),
  getByUser: (userId) =>
    axiosClient.get(`/dat-phong/lay-theo-nguoi-dung/${userId}`),
};
