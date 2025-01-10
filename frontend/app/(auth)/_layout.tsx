import { Stack } from "expo-router";
import { ReactElement } from "react";

export default function OnboardingLayout () : ReactElement {
    return (
        <Stack screenOptions={{
            headerShown : false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="signup" />
        </Stack>
    )
}