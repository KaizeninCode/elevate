import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="homepage" />
      {/* <Stack.Screen name="login" />
      <Stack.Screen name="confirm" />
      <Stack.Screen name="reset" /> */}
    </Stack>
  );
};

export default HomeLayout;
