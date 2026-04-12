import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const Confirm = () => {
  const {email} = useLocalSearchParams<{email: string}>()
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleConfirmPress = async () => {
    if (!code) {
      Alert.alert("Please enter the confirmation code.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_LIVE_BACKEND_URL}/auth/confirm`,
        { code },
      );
      if (res.status === 200) {
        Alert.alert("Email confirmed successfully! You can now log in.");
        router.push("/screens/auth/login");
      }
    } catch (error: any) {
      Alert.alert(
        "Email confirmation failed.",
        error?.response?.data?.message || "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendPress = async () => {
    if (!email) Alert.alert('Email is required to resend confirmation code.')
    
    try {
      setLoading(true)
      const res = await axios.post(`${process.env.EXPO_PUBLIC_LIVE_BACKEND_URL}/auth/request-code`, {email})
      if (res.status === 200) {
        Alert.alert('Confirmation code sent. Please check your email.')
      }
    } catch (error:any) {
      Alert.alert(
        "Could not resend confirmation code.",
        error?.response?.data?.message || "Please try again.",
      );
    } finally {
      setLoading(false)
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="w-full flex-1 bg-main"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 items-center justify-center px-5">
          <Text className="text-3xl font-bold mb-4">Confirm your email</Text>
          <View className="flex flex-col justify-center gap-4 w-4/5">
            <View className="gap-y-1 font-playful">
              <Text>Enter the 6 digit code that was sent to your email.</Text>
              <TextInput
                className="border border-primary p-4 rounded-xl my-4"
                keyboardType="numeric"
                value={code}
                onChangeText={setCode}
                maxLength={6}
              />
            </View>
          </View>
          {/* CTA BUTTON */}
          <AppButton
            title="Confirm your email"
            onPress={handleConfirmPress}
            loading={loading}
          />
          <Pressable onPress={handleResendPress}>
            <Text className="text-center mt-8">
              Don't receive a code?{" "}
              <Text className="font-bold text-primary">Resend code.</Text>
            </Text>
          </Pressable>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Confirm;
