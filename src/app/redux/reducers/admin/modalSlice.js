import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    type: null,
    open: false,
    data: null,
  },
  room: {
    type: null,
    open: false,
    data: null,
  },
  userRoom: {
    open: false,
    data: null,
  },
  location: {
    type: null,
    open: false,
    data: null,
  },
  booking: {
    type: null,
    open: false,
    data: null,
  },
};

const userSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setUserModal: (state, action) => {
      state.user = action.payload;
    },
    setLocationModal: (state, action) => {
      state.location = action.payload;
    },
    setRoomModal: (state, action) => {
      state.room = action.payload;
    },
    setBookingModal: (state, action) => {
      state.booking = action.payload;
    },
    setUserRoomModal: (state, action) => {
      state.userRoom = action.payload;
    },
  },
});

export const {
  setUserModal,
  setLocationModal,
  setRoomModal,
  setBookingModal,
  setUserRoomModal,
} = userSlice.actions;

export default userSlice.reducer;
