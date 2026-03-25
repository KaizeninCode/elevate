import { Redirect, useRouter } from "expo-router";
import "../global.css";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <Redirect href='/screens/auth/register'/>
  );
}
