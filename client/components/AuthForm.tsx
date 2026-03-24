import { View, Text, TextInput, Pressable } from "react-native";
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
    <View className="w-full gap-y-4 font-regular items-center">
      <Text className="text-3xl font-bold">
        {type === "register" ? "Start your journey" : "Welcome back!"}
      </Text>
      <View className="flex flex-col justify-center gap-4 w-4/5">
        {type === "register" && (
          <View className="gap-y-1 font-playful">
            <Text>Name</Text>
            <TextInput
              className="border border-primary px-4 py-2 rounded-xl"
              placeholder="Enter your first name"
              placeholderTextColor={'gray'}
            />
          </View>
        )}
        <View className="gap-y-1 font-playful">
          <Text>Email</Text>
          <TextInput
            className="border border-primary px-4 py-2 rounded-xl"
            placeholder="Enter your email"
            placeholderTextColor={'gray'}
          />
        </View>
        {type === "register" && (
          <View className="gap-y-1 font-playful">
            <Text>Phone</Text>
            <TextInput
              className="border border-primary px-4 py-2 rounded-xl"
              placeholder="+123 456 789"
              placeholderTextColor={'gray'}
            />
          </View>
        )}
        <View className="gap-y-1 font-playful">
          <Text>Password</Text>
          <TextInput
            className="border border-primary px-4 py-2 rounded-xl"
            placeholder="********"
            placeholderTextColor={'gray'}
            secureTextEntry={true}
          />
        </View>
        {type === "register" && (
          <View className="gap-y-1 font-playful">
            <Text>Confirm Password</Text>
            <TextInput
              className="border border-primary px-4 py-2 rounded-xl"
              placeholder="********"
              placeholderTextColor={'gray'}
              secureTextEntry={true}
            />
          </View>
        )}

        {/* CTA BUTTON */}
        <AppButton
          title={type === "register" ? "Get Started" : "Resume your journey"}
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
          title='Continue With Google'
        />
      </View>
    </View>
  );
};

export default AuthForm;
