import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";

const Login = () => {
  return (
    <SafeAreaView className="w-full h-full bg-main  flex-1 items-center justify-center px-5">
      <Text className="text-3xl font-bold mb-4">Confirm your email</Text>
      <View className="flex flex-col justify-center gap-4 w-4/5">
        <View className="gap-y-1 font-playful">
          <Text>
            Enter the 6 digit code that was sent to{" "}
            <Text className="font-bold">email@example.com</Text>
          </Text>
          <TextInput className="border border-primary p-4 rounded-xl my-4" />
        </View>
      </View>
      {/* CTA BUTTON */}
      <AppButton title="Confirm your email" onPress={() => router.push('/screens/auth/login')}/>

      <Pressable>
        <Text className="text-center mt-8">
          Don't receive a code?{" "}
          <Text className="font-bold text-primary">Resend code.</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
