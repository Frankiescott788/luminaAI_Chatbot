import { Menu02Icon, SentIcon } from "@/assets/icons/icons";
import useChats from "@/hooks/useChats";
import { Chats, NewChat } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowCircleUp, Clock } from "iconsax-react-native";
import React, { useEffect, useRef } from "react";
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

  const scrollViewRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState(new Date().toISOString());

  const { newChat, getSessionchats } = useChats();

  const mutation = useMutation({
    mutationFn: newChat,
    onSuccess: (res) => {
      setChats((prevChats) => [
        ...prevChats,

        {
          role: "model",
          message: res.res.split("*"),
          sentAt: new Date().toISOString(),
        },
      ]);
    },
  });

  function sendMessage() {
    setMessage("");
    mutation.mutate({ chat_id: chatId, message });
    setChats((prevChats) => [
      ...prevChats,
      {
        role: "user",
        message,
        sentAt: new Date().toISOString(),
      },
    ]);
  }

  function startNewChat() {
    setChats([]);
    setMessage("");
    setChatId(new Date().toISOString());
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chats]);

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
            <TouchableOpacity
              className="bg-primaryblue rounded-lg p-2"
              onPress={startNewChat}
            >
              <Text className="text-white ">New Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
          <View
            className={`flex-col ${
              chats.length !== 0 ? "pt-10 pb-[8rem]" : ""
            } `}
          >
            {chats.length !== 0 &&
              chats.map((chat: Chats, i) => (
                <React.Fragment key={chat.sentAt}>
                  <View className="ps-8">
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
                          <>
                            <TypeWriter
                              typing={1}
                              initialDelay={1}
                              minDelay={1}
                              maxDelay={1}
                              style={[styles.poppinsMedium]}
                              className="text-lg"
                              onTyped={() => {
                                scrollViewRef.current?.scrollToEnd({
                                  animated: true,
                                });
                              }}
                            >
                              {chat.message}
                            </TypeWriter>
                          </>
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

                  <View
                    className={`flex-row gap-1  ${
                      chat.role === "model"
                        ? "justify-start ps-10"
                        : "justify-end"
                    } mb-5`}
                  >
                    <View className="py-1">
                      <Clock
                        size={15}
                        variant="Bulk"
                        color="black"
                        className="mt-1"
                      />
                    </View>
                    <Text
                      className="text-end text-sm text-gray-400 pt-1 "
                      style={styles.poppinsMedium}
                    >
                      {formatDate(chat.sentAt)}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
          </View>

          {chats.length === 0 && (
            <View className="pt-20">
              <View className="flex-row justify-center">
                <Image source={lumaniLogo} className="h-[19rem] w-[15rem]" />
              </View>
              <View className="py-4">
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
          style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
          className="bg-white"
        >
          <View className="flex-row p-1 w-full">
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
          <Text
            className="text-center text-sm text-gray-400 py-2"
            style={[styles.poppinsMedium]}
          >
            Lumani can make mistakes, Check important info.
          </Text>
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
