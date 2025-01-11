import Loading from "@/components/Loading";
import { AuthContext } from "@/context/useAuth";
import { AuthContextTypes } from "@/types/types";
import { Redirect, Stack } from "expo-router";
import { ReactElement, useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingLayout () : ReactElement {

    const { isAuthenticated, isLoading } : AuthContextTypes = useContext(AuthContext);

    if(isLoading) {
        return (
            <Loading />
        )
    };

    if(isAuthenticated) {
        return <Redirect href={"/(main)"}/>
    }

    return (
        <Stack screenOptions={{
            headerShown : false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="signup" />
        </Stack>
    )
}