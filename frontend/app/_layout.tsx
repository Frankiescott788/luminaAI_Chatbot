import { Stack } from "expo-router";
import { ReactElement } from "react";
import { useFonts } from "expo-font";
import "@/global.css";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function RootLayout(): ReactElement {
  const [fontsLoaded] = useFonts({
    poppinsregular: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
    poppinsmedium: require("@/assets/fonts/Poppins/Poppins-Medium.ttf"),
    poppinssemibold: require("@/assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    poppinsbold: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </Provider>
  );
}
