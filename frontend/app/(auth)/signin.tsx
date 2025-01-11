import { ReactElement, useState } from "react";
import {
  Image,
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
import { SignupErr, User as Usertype, ApiResUser } from "@/types/types";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo = require("@/assets/pictures/herologo.png");
const googleicon = require("@/assets/pictures/googleicon.svg");

export default function Signup(): ReactElement {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameisFocused, usernamesetIsFocused] = useState(false);
  const [emailIsFocused, emailSetIsFocused] = useState(false)

  const [fieldErrors, setFieldErrors] = useState({
    user_id: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const Signin = async (data: ApiResUser): Promise<ApiResUser> => {
  if (!data.email || !data.password) {
    setFieldErrors((prevState) => ({
      ...prevState,
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

    return res.data;
  } catch (error) {
    throw error; 
  }
};


  const mutation = useMutation({
    mutationFn: Signin,
    onSuccess: async (res: ApiResUser) => {
      await AsyncStorage.setItem("token", res?.token as string);
      router.push("/(main)");
    },
    onError: (err: any) => {
      if (err.response.data.err_msg) {
        setFieldErrors(prevState => ({
          ...prevState,
          ...err.response.data.err_msg
        }))
        console.log(err.response.data.err_msg);
      }
    },
  });

  return (
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
            Sign in to continue
          </Text>
          <View className="flex flex-row justify-center">
            <Text
              className="text-center w-[25rem] text-gray-400 pt-1"
              style={[
                styles.regularFontFamily,
                {
                  lineHeight: 15,
                },
              ]}
            >
              Sign in to resume your conversations and get personalized
              recommendations.
            </Text>
          </View>
        </View>
        <View className="flex-col gap-4 pt-2">
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
            <View className={`flex flex-row gap-2 bg-[#F2F3F5] py-2 px-3 rounded-xl ${usernameisFocused ? "border-2 border-primaryblue" : ""}`}>
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
                onChangeText={setEmail}
                onFocus={() => usernamesetIsFocused(true)}
                onBlur={() => usernamesetIsFocused(false)}
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
            <View className={`flex flex-row gap-2 bg-[#F2F3F5] py-2 px-3 rounded-xl ${emailIsFocused ? "border-2 border-primaryblue" : ""}`}>
              <View className="mt-3">
                <Lockpad height={30} width={30} color="#9ca3af" />
              </View>
              <TextInput
                placeholder="Enter your password"
                className="text-lg mt-[5px] focus:border-red-500"
                style={[
                  styles.regularFontFamily,
                  {
                    lineHeight: 26,
                  },
                ]}
                onChangeText={setPassword}
                onFocus={() => emailSetIsFocused(true)}
                onBlur={() => emailSetIsFocused(false)}
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
                mutation.mutate({ email, password });
              }}
            >
              <Text
                className="text-center text-white text-xl"
                style={[styles.mediumFontFamily]}
              >
                {mutation.isPending ? "Loading..." : "Sign up"}
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
              Sign in with Google
            </Text>
          </TouchableOpacity>
          <Text
            className="text-center text-gray-400"
            style={[styles.regularFontFamily]}
          >
            Don't have an account?{" "}
            <Link href={"/(auth)/signin"} className="text-primaryblue">
              Sign up
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
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
