import { createSlice } from "@reduxjs/toolkit";
import { Signup } from "./apiAsyncThunks";
import { User } from "@/types/types";

const Authslice = createSlice({
    name : "auth",
    initialState : {
        currentUser : <User>{},
        status : "idle",
        error : ""
    },
    reducers : {},
    extraReducers : builder => {
        builder
            .addCase(Signup.pending, (state, action) => {
                state.status = "loading"
                console.log("loading")
            })
            .addCase(Signup.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = "success",
                console.log("signed up")
            })
            .addCase(Signup.rejected, (state, action) => {
                state.error = action.error.message as string,
                console.log(action.error.message)
            })
    }
})

export default Authslice