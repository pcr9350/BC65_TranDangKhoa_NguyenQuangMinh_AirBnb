import { configureStore } from "@reduxjs/toolkit";


export const storeAdmin = configureStore({
    reducer: {
        stateAdmin: (state = 10) => state
    }
})