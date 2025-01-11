import { Menu02Icon, SentIcon } from "@/assets/icons/icons";
import { NewChat } from "@/types/types";
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

const LogoText = require("@/assets/pictures/logotext.png");
const lumaniLogo = require("@/assets/pictures/herologo.png");

export default function Home(): ReactElement {
  const [messageInputFocused, setMessageInputFocused] = useState(false);

  const [chats, setChats] = useState([]);

  const [message, setMessage] = useState("");

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
      if(res.status === 200) {
        return res.data
      }
    } catch (error) {}
  };

  const mutation = useMutation({
    mutationFn : newChat,
    onSuccess : (res) => {
      console.log(res)
    }
  })

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
              <Text className="text-white  ">New Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View className="flex-col gap-5 py-10">
            <View>
              <View className="flex-row ">
                <View className="bg-gray-100 w-[20rem] py-5 px-2 rounded-tr-xl rounded-br-xl rounded-tl-xl ">
                  <Text className="text-lg">Hi how can i help you</Text>
                </View>
              </View>
            </View>
            <View className="ps-8">
              <View className="flex-row justify-end">
                <View className="bg-primaryblue w-[20rem] py-5 px-2 rounded-tr-xl  rounded-tl-xl rounded-bl-xl">
                  <Text className="text-lg text-white">
                    Hi how can i help you
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* <View>
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
              Good Morning How can i help you?
            </Text>
          </View>
        </View> */}
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
              onFocus={() => setMessageInputFocused(true)}
              onBlur={() => setMessageInputFocused(false)}
              onChangeText={setMessage}
              
            />
            <View>
              <TouchableOpacity className="pt-1" onPress={() => {
                mutation.mutate({ chat_id : new Date().toString(), message : "hello"})
              }}>
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
