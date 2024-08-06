import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    "id": 1,
      "tenPhong": "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
      "khach": 3,
      "phongNgu": 1,
      "giuong": 1,
      "phongTam": 1,
      "moTa": "Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
      "giaTien": 28,
      "mayGiat": true,
      "banLa": true,
      "tivi": true,
      "dieuHoa": false,
      "wifi": true,
      "bep": false,
      "doXe": true,
      "hoBoi": true,
      "banUi": true,
      "maViTri": 1,
      "hinhAnh": "https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg"
  }
};

const roomSelected = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload; 
    },
    resetRoomID: (state) => { // Thêm reducer để reset state
      state.room = initialState.room;
    }
  },
});

export const { setRoom, resetRoomID } = roomSelected.actions;

export default roomSelected.reducer;