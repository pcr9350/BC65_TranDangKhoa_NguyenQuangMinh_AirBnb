import toast from "react-hot-toast";
import { locationApi } from "./api/locationApi";
import { roomApi } from "./api/roomApi";

export const getsLocationService = async () => {
  try {
    const data = await locationApi.gets();
    return data.content;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return null;
  }
};

export const getLocationService = async (id) => {
  try {
    const data = await locationApi.get(id);
    return data.content;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return null;
  }
};

export const createLocationService = async (locationData) => {
  try {
    const data = await locationApi.create(locationData);
    toast.success("Tạo địa điểm thành công!");
    return data?.content;
  } catch (error) {
    console.error("Error creating location:", error);
    return null;
  }
};

export const updateLocationService = async (locationData) => {
  try {
    const data = await locationApi.update(locationData?.id, locationData);
    toast.success("Chỉnh sửa địa điểm thành công");
    return data?.content;
  } catch (error) {
    toast.error(error?.data?.content);
    return null;
  }
};

export const deleteLocationService = async (idLocation) => {
  try {
    await locationApi.delete(idLocation);
    return true;
  } catch (error) {
    console.error("Error deleting location:", error);
    return null;
  }
};

export const updateImageService = async (idRom, img) => {
  try {
    const res = await roomApi.uploadPhotoRoom(idRom, img);
    toast.success("Chỉnh sửa hình địa điểm thành công");
    return res?.content;
  } catch (error) {
    toast.error(error?.data?.content);
  }
};
