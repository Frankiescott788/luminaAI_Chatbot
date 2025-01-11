import { Stack } from "expo-router";
import { ReactElement } from "react";

export default function MainLayout () : ReactElement {
    return (
        <Stack screenOptions={{ headerShown : false }}>
            <Stack.Screen name="index"/>
        </Stack>
    )
}