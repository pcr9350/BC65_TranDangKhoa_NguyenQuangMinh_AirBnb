import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  binhLuan: null
};

const binhLuanContent = createSlice({
  name: "binhluan",
  initialState,
  reducers: {
    setBinhLuan: (state, action) => {
      state.locations = action.payload; 
    },
    resetBinhLuan: (state) => { // Thêm reducer để reset state
      state.locations = initialState.locations;
    }
  },
});

export const { setBinhLuan, resetBinhLuan } = binhLuanContent.actions;

export default binhLuanContent.reducer;