import toast from "react-hot-toast";
import { userApi } from "./api/userApi";
import { setData } from "../utils/storage";

export const loginService = async ({ email, password }) => {
  try {
    const data = await userApi.login({ email, password });
    setData("token", data?.content?.token);
    setData("userId", data?.content?.user?.id);
    return true;
  } catch (error) {
    toast.error(error?.data?.content);
    return false;
  }
};
