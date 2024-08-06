import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingrooms: null
};

const bookingRooms = createSlice({
  name: "bookingrooms",
  initialState,
  reducers: {
    setBookingRooms: (state, action) => {
      state.bookingrooms = action.payload; 
    },
    resetBookingRooms: (state) => { // Thêm reducer để reset state
      state.bookingrooms = initialState.bookingrooms;
    }
  },
});

export const { setBookingRooms, resetBookingRooms } = bookingRooms.actions;

export default bookingRooms.reducer;