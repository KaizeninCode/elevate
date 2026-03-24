import { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
// import { useColorScheme } from "nativewind";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // LOAD FONTS
  const [fontsLoaded] = useFonts({
    "InstrumentSans-Regular": require("../assets/fonts/InstrumentSans-Regular.ttf"),
    "InstrumentSans-Medium": require("../assets/fonts/InstrumentSans-Medium.ttf"),
    "InstrumentSans-Bold": require("../assets/fonts/InstrumentSans-Bold.ttf"),
    "Hubballi-Regular": require("../assets/fonts/Hubballi-Regular.ttf"),
  });
  // const { colorScheme } = useColorScheme();
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style='dark' />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
