import { View, Text, Pressable } from "react-native";
import React from "react";

interface AppButtonProps {
    title: string;
    onPress: () => void
}

const AppButton = ({title, onPress} : AppButtonProps) => {
  return (
    <Pressable className="p-4 rounded-xl bg-primary shadow-sm shadow-primary w-3/5 mx-auto mt-4" onPress={onPress}>
      <Text className="text-white text-center">{title}</Text>
    </Pressable>
  );
};

export default AppButton;
