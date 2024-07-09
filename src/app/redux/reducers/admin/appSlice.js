import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  toggleActions: {
    open: false,
    type: null,
    data: null,
  },
};

const sidebarSlider = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    toggleToggleActions: (state, action) => {
      state.toggleActions = action.payload;
    },
  },
});

export const { toggleSidebar, toggleToggleActions } = sidebarSlider.actions;

export default sidebarSlider.reducer;
