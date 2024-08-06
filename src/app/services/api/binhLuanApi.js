import { axiosClient } from "../axiosClient";

export const binhLuanApi = {
  gets: () => axiosClient.get("/binh-luan"),
  get: (id) => axiosClient.get(`/binh-luan/${id}`),
  create: (data) => axiosClient.post("/binh-luan", data),
  update: (id, data) => axiosClient.put(`/binh-luan/${id}`, data),
  delete: (id) => axiosClient.delete(`/binh-luan/${id}`),
  getByRoomID: (id) => axiosClient.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`),
};