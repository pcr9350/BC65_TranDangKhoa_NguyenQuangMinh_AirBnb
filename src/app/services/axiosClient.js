import axios from "axios";
import { storageData } from "../utils/storage";

export const baseURL = "https://airbnbnew.cybersoft.edu.vn/api";

export const axiosClient = axios.create({
  baseURL,
  timeout: 30000,
});

export const tokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBDeWJlclNvZnQiLCJIZXRIYW5TdHJpbmciOiIwNC8xMC8yMDM0IiwiSGV0SGFuVGltZSI6IjIwNDM1MzI4MDAwMDAiLCJuYmYiOjE5NTY1MDI4MDAsImV4cCI6MjA0MzY4MDQwMH0.z_jMW7ae1X1gIgL_ePE8et6ts5HNKNoWcpBd8jj-b_A";

axiosClient.interceptors.request.use(
  async (config) => {
    // Chỉ lấy token từ localStorage nếu đang ở phía client (trình duyệt)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : '',
        TokenCybersoft: tokenCybersoft,
        token: storageData.getData("token"),
      },
    };
  },
  (e) => Promise.reject(e)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log("No response from server");
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    return Promise.reject(error.response);
  }
);
