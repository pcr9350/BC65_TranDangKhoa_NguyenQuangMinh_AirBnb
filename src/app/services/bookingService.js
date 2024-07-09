import toast from "react-hot-toast";
import { bookingApi } from "./api/bookingApi";

export const getsBookingService = async () => {
  try {
    const data = await bookingApi.gets();
    return data?.content;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return null;
  }
};

export const updateBookingService = async (bookingData) => {
  try {
    const data = await bookingApi.put(bookingData);
    return data?.content;
  } catch (error) {
    console.error("Error updating booking:", error);
    return null;
  }
};

export const deleteBookingService = async (idBooking) => {
  try {
    await bookingApi.delete(idBooking);
    toast.success("Booking deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting booking:", error);
    return null;
  }
};

export const getRoomByUserIdService = async (userId) => {
  try {
    const data = await bookingApi.getByUser(userId);
    return data?.content;
  } catch (error) {
    console.error("Error fetching rooms by user ID:", error);
    return null;
  }
};

export const getRoomsByUser = async (userId) => {
  try {
    const rooms = await bookingApi.getByUser(userId);
    return rooms?.content;
  } catch (error) {
    console.error("Error fetching user's rooms:", error);
    return [];
  }
};
