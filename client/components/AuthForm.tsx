import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import AppButton from "./AppButton";
import { useRouter } from "expo-router";
import HorizontalRule from "./HorizontalRule";
import axios from "axios";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLoginPress = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Please fill in all required fields.");
      return;
    }
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_LIVE_BACKEND_URL}/auth/login`,
        payload,
      );
      if (res.status === 200) {
        Alert.alert("Logged in successfully!");
        router.push("/screens/homepage");
      }
    } catch (error: any) {
      Alert.alert(
        "Login failed.",
        error?.response?.data?.message ||
          "Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPress = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      Alert.alert("Please fill in all required fields.");
      return;
    }
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_LIVE_BACKEND_URL}/auth/register`,
        payload,
      );
      if (res.status === 201) {
        Alert.alert(
          "Registration successful. Please check your email to complete your registration.",
        );
        router.push({
          pathname: "/screens/auth/confirm",
          params: { email: formData.email },
        });
      }
    } catch (error: any) {
      Alert.alert(
        "Registration failed.",
        error?.response?.data?.message || "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPress = async () => {
    if (!formData.email) {
      Alert.alert("Email is required to reset password.");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_LIVE_BACKEND_URL}/auth/reset`,
        { params: { email: formData.email } },
      );
      if (res.status === 200) {
        Alert.alert(
          "Password reset request successful. Please check your email to reset your password.",
        );
        router.push({
          pathname: "/screens/auth/reset",
          params: { email: formData.email },
        });
      }
    } catch (error: any) {
      Alert.alert(
        "Error sending password reset email",
        error?.response?.data?.message || "Please try again.",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="w-full flex-1 mt-16"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 w-full gap-y-4 font-regular items-center ">
          <View className="flex flex-col justify-center gap-4 w-4/5">
            <Text className="text-3xl font-bold text-center">
              {type === "register" ? "Start your journey" : "Welcome back!"}
            </Text>
            {type === "register" && (
              <View className="gap-y-1">
                <Text>Name</Text>
                <TextInput
                  className="border border-primary p-4 rounded-xl"
                  placeholder="Enter your name"
                  placeholderTextColor={"gray"}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.nativeEvent.text })
                  }
                />
              </View>
            )}
            <View className="gap-y-1">
              <Text>Email</Text>
              <TextInput
                className="border border-primary p-4 rounded-xl"
                placeholder="Enter your email"
                placeholderTextColor={"gray"}
                keyboardType="email-address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.nativeEvent.text })
                }
              />
            </View>
            {type === "register" && (
              <View className="gap-y-1">
                <Text>Phone</Text>
                <TextInput
                  className="border border-primary p-4 rounded-xl"
                  placeholder="+123 456 789"
                  placeholderTextColor={"gray"}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.nativeEvent.text })
                  }
                />
              </View>
            )}
            <View className="gap-y-1">
              <Text>Password</Text>
              <TextInput
                className="border border-primary p-4 rounded-xl"
                placeholder="********"
                placeholderTextColor={"gray"}
                secureTextEntry={true}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.nativeEvent.text })
                }
              />
              {type === "login" && (
                <Pressable onPress={handleForgotPress}>
                  <Text className="font-semibold text-primary text-right mt-1">
                    Forgot password?
                  </Text>
                </Pressable>
              )}
            </View>
            {type === "register" && (
              <View className="gap-y-1">
                <Text>Confirm Password</Text>
                <TextInput
                  className="border border-primary p-4 rounded-xl"
                  placeholder="********"
                  placeholderTextColor={"gray"}
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                />
              </View>
            )}
            {/* CTA BUTTON */}
            <AppButton
              title={
                type === "register" ? "Get Started" : "Resume your journey"
              }
              onPress={
                type === "register" ? handleRegisterPress : handleLoginPress
              }
              loading={loading}
            />
            {type === "login" ? (
              <Pressable onPress={() => router.push("/screens/auth/register")}>
                <Text className="text-center mt-4">
                  Don't have an account yet?{" "}
                  <Text className="font-bold text-primary">Register.</Text>
                </Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => router.push("/screens/auth/login")}>
                <Text className="text-center mt-4">
                  Already have an account?{" "}
                  <Text className="font-bold text-primary">Log in.</Text>
                </Text>
              </Pressable>
            )}
            <HorizontalRule />
            {/* OAUTH */}
            <AppButton
              title="Continue With Google"
              onPress={() => Alert.alert("OAuth button clicked!")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
