import toast from "react-hot-toast";
import { binhLuanApi } from "./api/binhLuanApi";

export const getsBinhLuanService = async () => {
    try {
        const data = await binhLuanApi.gets();
        return data.content;
      } catch (error) {
        console.error("Error fetching binh luan:", error);
        return null;
      }
};

export const getBinhLuanByIDService = async (id) => {
    try {
        const data = await binhLuanApi.get(id);
        return data.content;
      } catch (error) {
        console.error("Error fetching binh luan by ID:", error);
        return null;
      }
};

export const createBinhLuanService = async (binhLuanData) => {
    try {
        const data = await binhLuanApi.create(binhLuanData);
        toast.success("Tạo bình luận thành công!");
        return data?.content;
      } catch (error) {
        console.error("Error create binh luan:", error);
        return null;
      }
};

export const updateBinhLuanService = async (binhLuanData) => {
    try {
      const data = await binhLuanApi.update(binhLuanData?.id, binhLuanData);
      toast.success("Sửa bình luận thành công");
      return data?.content;
    } catch (error) {
      toast.error(error?.data?.content);
      return null;
    }
  };

  export const deleteBinhLuanService = async (id) => {
    try {
      await binhLuanApi.delete(id);
      return true;
    } catch (error) {
      console.error("Lỗi xóa bình luận:", error);
      return null;
    }
  };

  export const getBinhLuanByRoomIDService = async (id) => {
    try {
        const data = await binhLuanApi.getByRoomID(id);
        return data?.content;
      } catch (error) {
        console.error("Lỗi lấy bình luận theo phòng:", error);
        return null;
      }
};