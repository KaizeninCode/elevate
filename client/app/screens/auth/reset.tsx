import { View, Text, TextInput } from "react-native";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";

const Login = () => {
  return (
    <SafeAreaView className="w-full h-full bg-main  flex-1 items-center justify-center px-5">
      <Text className="text-3xl font-bold mb-8">Reset your password</Text>
      <View className="flex flex-col justify-center gap-4 w-4/5">
        <View className="gap-y-1 font-playful">
          <Text>New Password</Text>
          <TextInput
            className="border border-primary p-4 rounded-xl"
            placeholder="********"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
          />
        </View>
        <View className="gap-y-1 font-playful">
          <Text>Confirm New Password</Text>
          <TextInput
            className="border border-primary p-4 rounded-xl mb-8"
            placeholder="********"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
          />
        </View>
      </View>
      {/* CTA BUTTON */}
        <AppButton
          title='Reset your password'
          onPress={() => router.push('/screens/auth/login')}
        />
    </SafeAreaView>
  );
};

export default Login;
