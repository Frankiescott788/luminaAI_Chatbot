import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./auth";

const store = configureStore({
    reducer : {
        AuthReducer : Authslice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch
export default store