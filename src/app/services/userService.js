import toast from "react-hot-toast";
import { userApi } from "./api/userApi";

export const getUsersService = async () => {
  try {
    const data = await userApi.getUsers();
    return data?.content;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const getUserService = async (id) => {
  try {
    const user = await userApi.getUser(id);
    return user?.content;
  } catch (error) {
    console.error("Error fetching user context:", error);
    return null;
  }
};

export const searchUserService = async (term) => {
  try {
    const users = await userApi.searchUser(term);
    return users?.content;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};

export const deleteUserService = async (userId) => {
  try {
    await toast.promise(userApi.deleteUser(userId), {
      loading: "Deleting user...",
      success: "User deleted successfully!",
      error: "Error deleting user!",
    });
    return true;
  } catch (error) {
    toast.error(error?.data?.content);
    return false;
  }
};

export const updateUserService = async (userData) => {
  try {
    const user = await userApi.updateUser(userData?.id, userData);
    toast.success("User updated successfully");
    return user?.content;
  } catch (error) {
    console.log(error);
    toast.error(error?.data?.content);
    return null;
  }
};

export const createUserService = async (user) => {
  try {
    const createdUser = await userApi.createUser(user);
    toast.success("User created successfully");
    return createdUser?.content;
  } catch (error) {
    toast.error(error?.data?.content);
    return null;
  }
};

export const updateUserAvatarService = async (formFile) => {
  try {
    const updateAvatar = await userApi.uploadAvatar(formFile);
    if(updateAvatar?.content) {
      toast.success("Cập nhật avatar thành công");
      return updateAvatar.content;
    }
  } catch (error) {
    toast.error(error?.updateAvatar?.content);
    return null;
  }
}
