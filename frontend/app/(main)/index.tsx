import { Menu02Icon, SentIcon } from "@/assets/icons/icons";
import { Chats, NewChat } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowCircleUp } from "iconsax-react-native";
import { ReactElement, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TypeWriter from "react-native-typewriter";

const LogoText = require("@/assets/pictures/logotext.png");
const lumaniLogo = require("@/assets/pictures/herologo.png");

export default function Home(): ReactElement {
  const [messageInputFocused, setMessageInputFocused] = useState(false);

  const [chats, setChats] = useState<Chats[]>([]);

  const [message, setMessage] = useState("");
  const chat_id = new Date().toDateString();

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

  const mutation = useMutation({
    mutationFn: newChat,
    onSuccess: (res) => {
      setChats((prevChats) => [
        ...prevChats,

        {
          role: "model",
          message: res.res.split("*"),
        },
      ]);
    },
  });

  function sendMessage() {
    setMessage("");
    mutation.mutate({ chat_id, message });
    setChats((prevChats) => [
      ...prevChats,
      {
        role: "user",
        message,
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-5 py-4">
      <View className="flex-1">
        <View className="flex-row justify-between">
          <View className="py-2">
            <TouchableOpacity>
              <Menu02Icon height={34} width={34} color="black" />
            </TouchableOpacity>
          </View>
          <View className="py-1">
            <Text
              style={[
                styles.logoFont,
                {
                  fontSize: 28,
                },
              ]}
              className="text-primaryblue"
            >
              Lumina.
            </Text>
          </View>
          <View className="py-3">
            <TouchableOpacity className="bg-primaryblue rounded-lg p-2">
              <Text className="text-white ">New Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View className="flex-col gap-5 py-10">
            {chats.length !== 0 &&
              chats.map((chat: Chats, i) => (
                <View className="ps-8" key={i}>
                  <View
                    className={`flex-row ${
                      chat.role === "model" ? "justify-start" : "justify-end"
                    } `}
                  >
                    <View
                      className={`${
                        chat.role === "model"
                          ? "bg-gray-100 rounded-bl-xl"
                          : "bg-primaryblue rounded-bl-xl"
                      } w-[20rem] py-5 px-2 rounded-tr-xl  rounded-tl-xl rounded-bl-xl`}
                    >
                      {chat.role === "model" && (
                        <TypeWriter
                          typing={1}
                          minDelay={5}
                          maxDelay={10}
                          style={[styles.poppinsMedium]}
                          className="text-lg"
                        >
                          {chat.message}
                        </TypeWriter>
                      )}
                      {chat.role === "user" && (
                        <Text
                          className="text-white text-lg"
                          style={[styles.poppinsMedium]}
                        >
                          {chat.message}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
          </View>
          {chats.length === 0 && (
          <View>
            <View className="flex-row justify-center">
              <Image source={lumaniLogo} className="h-[19rem] w-[15rem]" />
            </View>
            <View className="py-8">
              <Text
                style={[
                  styles.poppinsMedium,
                  {
                    lineHeight: 48,
                  },
                ]}
                className="text-center text-4xl text-gray-400"
              >
                Good Evening How can i help you?
              </Text>
            </View>
          </View>
        )}
        </ScrollView>
        

        <View
          className="flex-row p-1 w-full"
          style={{ position: "absolute", bottom: 0 }}
        >
          <View className="flex-row gap-4">
            <TextInput
              placeholder="Message..."
              className={`text-xl bg-gray-100 py-5 px-3 rounded-xl w-[24rem] ${
                messageInputFocused ? "border-2 border-primaryblue" : ""
              }`}
              multiline
              onFocus={() => setMessageInputFocused(true)}
              onBlur={() => setMessageInputFocused(false)}
              onChangeText={setMessage}
              value={message}
            />
            <View>
              <TouchableOpacity className="pt-1" onPress={sendMessage}>
                <ArrowCircleUp size="55" color="#19AFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoFont: {
    fontFamily: "logotext",
  },
  poppinsMedium: {
    fontFamily: "poppinsmedium",
  },
});
