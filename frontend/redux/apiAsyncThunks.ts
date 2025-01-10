import { User } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const Signup = createAsyncThunk("/signup", async (user : User) => {

    const newUser = {
        username : user.username,
        email : user.email,
        password : user.username
    }

    await Axios.post("http://10.0.2.2:8080/api/signup", newUser);

    return newUser
})