import { NewChat } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function useChats () {
    const newChat = async (newchat: NewChat) => {
        try {
          const token = await AsyncStorage.getItem("token");
          if (!token) {
            console.log("no token");
          }
          const res = await axios.post(
            "https://luminaai-chatbot.onrender.com/api/newchat",
            newchat,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status === 200) {
            return res.data;
          }
        } catch (error) {}
      };

    const getSessionchats = async ( id : string) => {
        try {
            const token = await AsyncStorage.getItem("token");
            if(!token) {
                console.log("no token");
                return
            }
            const res = await axios("https://luminaai-chatbot.onrender.com/api/chats/" + id );
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    } 

    return { newChat, getSessionchats }
}