import { View, Text } from "react-native";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  return (
    <SafeAreaView className="w-full h-full bg-main  flex-1 items-center justify-center px-5">
      <AuthForm type='register'/>
    </SafeAreaView>
  );
};

export default Register;
