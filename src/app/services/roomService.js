import toast from "react-hot-toast";
import { roomApi } from "./api/roomApi";

export const getsRoomService = async () => {
  try {
    const data = await roomApi.gets();
    return data?.content;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return null;
  }
};

export const createRoomService = async (roomData) => {
  try {
    const data = await roomApi.createRoom(roomData);
    toast.success("Room created successfully");
    return data?.content;
  } catch (error) {
    console.error("Error creating room:", error);
    return null;
  }
};

export const getRoomByLocationService = async (idLocation) => {
  try {
    const data = await roomApi.getRoomByLocation(idLocation);
    return data?.content;
  } catch (error) {
    console.error("Error fetching rooms by location:", error);
    return null;
  }
};

export const updateRoomService = async (roomData) => {
  try {
    const data = await roomApi.updateRoom(roomData.id, roomData);
    toast.success("Room updated successfully");
    return data?.content;
  } catch (error) {
    toast.error(error?.data?.content);
    return null;
  }
};

export const deleteRoomService = async (idRoom) => {
  try {
    await roomApi.deleteRoom(idRoom);
    toast.success("Room deleted successfully");
    return true;
  } catch (error) {
    toast.error(error?.data?.content);
    return null;
  }
};
