import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView } from "react-native";
import React from "react";
import AppButton from "./AppButton";
import { useRouter } from "expo-router";
import HorizontalRule from "./HorizontalRule";
interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();

  const handleLoginPress = () => router.push("/screens/auth/login");
  const handleRegisterPress = () => router.push("/screens/auth/register");
  return (
    <KeyboardAvoidingView className="w-full gap-y-4 font-regular items-center">
      <Text className="text-3xl font-bold">
        {type === "register" ? "Start your journey" : "Welcome back!"}
      </Text>
      <View className="flex flex-col justify-center gap-4 w-4/5">
        {type === "register" && (
          <View className="gap-y-1">
            <Text>Name</Text>
            <TextInput
              className="border border-primary p-4 rounded-xl"
              placeholder="Enter your name"
              placeholderTextColor={"gray"}
            />
          </View>
        )}
        <View className="gap-y-1">
          <Text>Email</Text>
          <TextInput
            className="border border-primary p-4 rounded-xl"
            placeholder="Enter your email"
            placeholderTextColor={"gray"}
          />
        </View>
        {type === "register" && (
          <View className="gap-y-1">
            <Text>Phone</Text>
            <TextInput
              className="border border-primary p-4 rounded-xl"
              placeholder="+123 456 789"
              placeholderTextColor={"gray"}
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
          />
          {type === "login" && (
            <Pressable onPress={() => router.push('/screens/auth/reset')}>
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
            />
          </View>
        )}

        {/* CTA BUTTON */}
        <AppButton
          title={type === "register" ? "Get Started" : "Resume your journey"}
          onPress={
            type === "register"
              ? () => router.push("/screens/auth/confirm")
              : () => router.push("/screens/(tabs)/homepage")
          }
        />

        {type === "login" ? (
          <Pressable onPress={handleRegisterPress}>
            <Text className="text-center mt-4">
              Don't have an account yet?{" "}
              <Text className="font-bold text-primary">Register.</Text>
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleLoginPress}>
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
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
