import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() : ReactElement {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row justify-center items-center flex-1">
                <Text style={[
                    styles.logoFont
                ]}
                className="text-primaryblue text-4xl"
                >Loading...</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logoFont: {
        fontFamily: "logotext",
      },
})