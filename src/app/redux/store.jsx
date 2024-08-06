import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/home/userSlice";
import searchSlice from "./reducers/home/searchSlice";
import locationSlice from "./reducers/home/locationSlice";
import roomSlice from "./reducers/home/roomSlice";
import binhLuanSlice from "./reducers/home/binhLuanSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        search: searchSlice,
        locations: locationSlice,
        room: roomSlice,
        binhluan: binhLuanSlice,
        
    }
})