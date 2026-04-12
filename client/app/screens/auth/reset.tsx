import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const Reset = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleResetPress = async () => {
    if (!email || !password || !code) {
      Alert.alert("Email is required to reset password.");
      return;
    }

    const payload = { newPassword:password, code };
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_LIVE_BACKEND_URL}/auth/reset`,
        payload,
      );
      if (res.status === 200) {
        Alert.alert("Password reset request successful");
        router.push("/screens/auth/login");
      }
    } catch (error: any) {
      Alert.alert(
        "Password reset failed",
        error?.response?.data?.message || "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // UNFINISHED!! COMPLETE DIGNOSING RESET PASSWORD FLOW 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-main"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="w-full h-full bg-main  flex-1 items-center justify-center px-5">
          <Text className="text-3xl font-bold mb-8">Reset your password</Text>
          <View className="flex flex-col justify-center gap-4 w-4/5">
            <View className="gap-y-1 font-playful">
              <Text>Code</Text>
              <TextInput
                className="border border-primary p-4 rounded-xl"
                placeholder="6 digit code"
                placeholderTextColor={"gray"}
                maxLength={6}
                value={code}
                onChangeText={setCode}
              />
            </View>
            <View className="gap-y-1 font-playful">
              <Text>New Password</Text>
              <TextInput
                className="border border-primary p-4 rounded-xl"
                placeholder="********"
                placeholderTextColor={"gray"}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
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
            title="Reset your password"
            onPress={handleResetPress}
            loading={loading}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Reset;
