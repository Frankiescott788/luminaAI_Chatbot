import { useRouter } from "expo-router";
import { ReactElement } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Start(): ReactElement {

  const router = useRouter();

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="w-full">
        <View>
          <View className="flex flex-row justify-center">
            <Image
              source={require("@/assets/pictures/herologo.png")}
              className="w-[15rem] h-[20rem] "
            />
          </View>
          <View className="flex flex-row justify-center pt-5">
            <Image
              source={require("@/assets/pictures/herochat.png")}
              className="w-[32rem] h-[20rem]"
            />
          </View>
          <View>
            <View>
              <Text className="text-center text-[3rem]" style={[styles.regularFontFamily, { fontSize: 40, lineHeight : 50 }]}>
                Explore with <Text className="text-primaryblue">Lumina</Text>
              </Text>
              <Text className="text-center text-gray-400 text-" style={[styles.regularFontFamily, { fontSize: 15, lineHeight : 20 }]}>
                Chat with Lumina and discover what it can do for you.
              </Text>
            </View>
            <View className="px-8 flex flex-row justify-center w-full">
              <TouchableOpacity 
                className="bg-primaryblue py-[20px] my-4 rounded-xl w-full"
                onPress={() => router.push("/(auth)/signup")}
              >
                <Text className="text-center text-2xl text-white" style={styles.mediumFontFamily}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  regularFontFamily : {
    fontFamily : "poppinsregular",
  },
  mediumFontFamily : {
    fontFamily : "poppinsmedium"
  }
})