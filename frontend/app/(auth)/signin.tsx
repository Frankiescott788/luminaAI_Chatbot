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
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "@/redux/apiAsyncThunks";
import { DispatchType, RootState } from "@/redux/store";

const logo = require("@/assets/pictures/herologo.png");
const googleicon = require("@/assets/pictures/googleicon.svg");

export default function Signin(): ReactElement {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch: DispatchType = useDispatch();
  const router = useRouter();

  const { status } = useSelector((state : RootState) => state.AuthReducer);

  const dispatchSignup = () => {
    dispatch(Signup({ username, email, password }));
  };

  function Redirect () {
    if(status === "success") {
      router.push("/(main)");
    }
  }

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
            <View className="flex flex-row gap-2 bg-[#F2F3F5] py-2 px-3 rounded-xl">
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
              />
            </View>
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
            <View className="flex flex-row gap-2 bg-[#F2F3F5] py-2 px-3 rounded-xl">
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
              />
            </View>
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
            <View className="flex flex-row gap-2 bg-[#F2F3F5] py-2 px-3 rounded-xl">
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
                secureTextEntry
              />
            </View>
          </View>
          <View className="w-full">
            <TouchableOpacity
              className="bg-primaryblue py-5 rounded-xl my-2"
              onPress={() => {
                dispatchSignup();
                Redirect();
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
            <Link href={"/(auth)/signup"} className="text-primaryblue">
              Sign in
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
