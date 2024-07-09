import { axiosClient } from "../axiosClient";

export const locationApi = {
  gets: () => axiosClient.get("/vi-tri"),
  get: (id) => axiosClient.get(`/vi-tri/${id}`),
  create: (data) => axiosClient.post("/vi-tri", data),
  update: (id, data) => axiosClient.put(`/vi-tri/${id}`, data),
  delete: (id) => axiosClient.delete(`/vi-tri/${id}`),
  updateImage: () => axiosClient.post("/vi-tri/upload-hinh-vitri"),
};
