import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs'; // Add dayjs or date formatting

const today = dayjs().format("YYYY-MM-DD");
const tomorrow = dayjs().add(1, 'day').format("YYYY-MM-DD");


const initialState = {
  search: {
    roomID: 1, 
    checkInDate: today,  // Set today as default check-in
    checkOutDate: tomorrow, // Set tomorrow as default check-out
    soLuongKhach: 1,    
  },
};

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload; 
    },
    resetSearch: (state) => { // Thêm reducer để reset state
      state.search = initialState.search;
    }
  },
});

export const { setSearch, resetSearch } = search.actions;

export default search.reducer;
