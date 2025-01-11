import { ReactElement, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Google, User } from "iconsax-react-native";
import { Email, Lockpad } from "@/assets/icons/icons";
import { Link, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SignupErr, User as UserType } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo = require("@/assets/pictures/herologo.png");
const googleicon = require("@/assets/pictures/googleicon.svg");

export default function Signin(): ReactElement {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    user_id : "",
    username: "",
    email: "",
    password: "",
  });

  const [usernameIsFocused, setUsernameIsFocused] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const router = useRouter();

  const handleSignup = async (data : UserType) => {
    if (!data.email || !data.password) {
      setFieldErrors((prevState) => ({
        ...prevState,
        username: !data.email ? "Username is required" : "",
        email: !data.email ? "Email is required" : "",
        password: !data.password ? "Password is required" : "",
      }));
      throw new Error("Email and password are required");
    }
  
    setFieldErrors({
      user_id: "",
      username: "",
      email: "",
      password: "",
    })
  
    try {
      const res = await axios.post(
        "https://luminaai-chatbot.onrender.com/api/signin",
        data
      );
  
      return res.data; // Make sure to return the response data of type ApiResUser
    } catch (error) {
      throw error; // Throw the error to be caught by onError in mutation
    }
  }

  const mutation = useMutation({
    mutationFn : handleSignup,
    onSuccess : async (res) => {
      router.push("/(main)");
      await AsyncStorage.setItem("token", res?.token as string);
    },
    onError : (err : SignupErr) => {
      
      if(err.response.data.validation) {
        setFieldErrors(prevState => ({
          ...prevState,
          ...err.response.data.validation
        }))
      }
    },
  });


  
  return (
    <ScrollView>
    
    <SafeAreaView className="flex-1  bg-white px-8 pt-5">
    
      <View>
        <View className="flex flex-row justify-center">
          <Image source={logo} className="h-[10rem] w-[8rem]" />
        </View>
        <View className="py-4">
          <Text
            className="text-center"
            style={[
              styles.regularFontFamily,
              {
                fontSize: 32,
                lineHeight: 40,
              },
            ]}
          >
            Sign up for Free
          </Text>
          <View className="flex flex-row justify-center">
            <Text
              className="text-center w-[20rem] text-gray-400 pt-1"
              style={[
                styles.regularFontFamily,
                {
                  lineHeight: 15,
                },
              ]}
            >
              Create an account to unlock intelligent conversations and more.
            </Text>
          </View>
        </View>
        <View className="flex-col gap-4">
          <View>
            <Text
              className="py-1 ps-2 text-lg"
              style={[
                styles.regularFontFamily,
                {
                  lineHeight: 15,
                },
              ]}
            >
              Username
            </Text>
            <View className={`flex flex-row gap-2 bg-[#F2F3F5] py-2 px-3 rounded-xl ${usernameIsFocused ? "border-2 border-primaryblue" : ""}`}>
              <View className="mt-3">
                <User size={25} color="#9ca3af" />
              </View>
              <TextInput
                placeholder="Enter your username"
                className="text-lg mt-1"
                style={[
                  styles.regularFontFamily,
                  {
                    lineHeight: 26,
                  },
                ]}
                value={username}
                onChangeText={setUsername}
                onFocus={() => setUsernameIsFocused(true)}
                onBlur={() => setUsernameIsFocused(false)}
              />
            </View>
            {fieldErrors.username && (
              <View>
                <Text className="ps-2 pt-1" style={[styles.regularFontFamily ,{ color: "#ef4444", fontSize: 12 }]}>
                  {fieldErrors.username}
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text
              className="py-1 ps-2 text-lg"
              style={[
                styles.regularFontFamily,
                {
                  lineHeight: 15,
                },
              ]}
            >
              Email
            </Text>
            <View className={`flex flex-row gap-2 bg-[#F2F3F5] py-2 px-3 rounded-xl ${emailIsFocused ? "border-2 border-primaryblue" : ""}`}>
              <View className="mt-3">
                <Email width={30} height={30} color="#9ca3af" />
              </View>
              <TextInput
                placeholder="Enter your email"
                className="text-lg mt-[5px]"
                style={[
                  styles.regularFontFamily,
                  {
                    lineHeight: 26,
                  },
                ]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailIsFocused(true)}
                onBlur={() => {
                  setEmailIsFocused(false)
                }}
              />
            </View>
            {fieldErrors.email && (
              <View>
                <Text className="ps-2 pt-1" style={[styles.regularFontFamily ,{ color: "#ef4444", fontSize: 12 }]}>
                  {fieldErrors.email}
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text
              className="py-1 ps-2 text-lg"
              style={[
                styles.regularFontFamily,
                {
                  lineHeight: 15,
                },
              ]}
            >
              Password
            </Text>
            <View className={`flex flex-row gap-2 bg-[#F2F3F5] py-2 px-3 rounded-xl ${passwordIsFocused ? "border-2 border-primaryblue" : ""}`}>
              <View className="mt-3">
                <Lockpad height={30} width={30} color="#9ca3af" />
              </View>
              <TextInput
                placeholder="Enter your password"
                className="text-lg mt-[5px]"
                style={[
                  styles.regularFontFamily,
                  {
                    lineHeight: 26,
                  },
                ]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordIsFocused(true)}
                onBlur={() => setPasswordIsFocused(false)}
                secureTextEntry
              />
            </View>
            {fieldErrors.password && (
              <View>
                <Text className="ps-2 pt-1" style={[styles.regularFontFamily ,{ color: "#ef4444", fontSize: 12 }]}>
                  {fieldErrors.password}
                </Text>
              </View>
            )}
          </View>
          <View className="w-full">
            <TouchableOpacity
              className="bg-primaryblue py-5 rounded-xl my-2"
              onPress={() => {
                mutation.mutate({ username, email, password })
              }}
            >
              <Text
                className="text-center text-white text-xl"
                style={[styles.mediumFontFamily]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center gap-2">
            <View className="w-[12rem] h-[1px] bg-gray-200 mt-2"></View>
            <View>
              <Text className="text-sm text-gray-400">OR</Text>
            </View>
            <View className="w-[12rem] h-[1px] bg-gray-200 mt-2"></View>
          </View>
          <TouchableOpacity className="flex flex-row justify-center items-center bg-[#F2F3F5] py-3 px-4 rounded-xl ">
            <Google size={32} color="black" />
            <Text
              className="text-center text-gray-600 text-lg ml-2 mt-1"
              style={[styles.regularFontFamily]}
            >
              Sign up with Google
            </Text>
          </TouchableOpacity>
          <Text
            className="text-center text-gray-400"
            style={[styles.regularFontFamily]}
          >
            Already have an account?{" "}
            <Link href={"/(auth)/signin"} className="text-primaryblue">
              Sign in
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  regularFontFamily: {
    fontFamily: "poppinsregular",
  },
  mediumFontFamily: {
    fontFamily: "poppinsmedium",
  },
});
