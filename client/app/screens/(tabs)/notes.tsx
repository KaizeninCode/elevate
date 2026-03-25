import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";

const Notes = () => {
  return (
    <SafeAreaView className=" bg-main px-5 flex-1 items-center justify-center">
        <Text>Notes Page</Text>
      <AppButton title="Back to starter screen" onPress={() => router.push('/screens/auth/login')}/>
    </SafeAreaView>
  );
};

export default Notes;
