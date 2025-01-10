import { Stack } from "expo-router";
import { ReactElement } from "react";

export default function MainLayout () : ReactElement {
    return (
        <Stack>
            <Stack.Screen name="index"/>
        </Stack>
    )
}