import { configureStore } from "@reduxjs/toolkit";
import userSlider from "./reducers/admin/userSlice";
import appSlice from "./reducers/admin/appSlice";
import modalSlice from "./reducers/admin/modalSlice";


export const storeAdmin = configureStore({
    reducer: {
        user: userSlider, 
        app: appSlice, 
        modal: modalSlice,
    }
})