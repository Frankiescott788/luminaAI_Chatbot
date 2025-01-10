import { User } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Signup = createAsyncThunk("/signup", async (user : User) => {

    const newUser = {
        username : user.username,
        email : user.email,
        password : user.password
    }

    // await AsyncStorage.setItem("token")
    
    await Axios.post("https://luminaai-chatbot.onrender.com/api/signup", newUser);

    return newUser
})