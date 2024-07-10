
import { axiosClient } from "../axiosClient";

export const roomApi = {
  gets: () => axiosClient.get(`/phong-thue`),
  createRoom: (roomData) => axiosClient.post(`/phong-thue`, roomData),
  getRoom: (id) => axiosClient.get(`/phong-thue/${id}`),
  updateRoom: (id, data) => axiosClient.put(`/phong-thue/${id}`, data),
  deleteRoom: (id) => axiosClient.delete(`/phong-thue/${id}`),
  updateImage: () => axiosClient.put(`/phong-thue/upload-hinh-phong`),
  getRoomByLocation: (id) =>
    axiosClient.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`), // query = maViTri (string)

};
