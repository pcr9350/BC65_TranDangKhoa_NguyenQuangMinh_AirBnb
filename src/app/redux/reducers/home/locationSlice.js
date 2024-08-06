import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: {
    id: 1,
    tenViTri: "Quận 1",
    tinhThanh: "Hồ Chí Minh",
    quocGia: "Việt Nam",
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg"
  }
};

const locationsSelected = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocationsID: (state, action) => {
      state.locations = action.payload; 
    },
    resetLocationsID: (state) => { // Thêm reducer để reset state
      state.locations = initialState.locations;
    }
  },
});

export const { setLocationsID, resetLocationsID } = locationsSelected.actions;

export default locationsSelected.reducer;
