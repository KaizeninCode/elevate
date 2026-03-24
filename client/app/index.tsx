import { useRouter } from "expo-router";
import "../global.css";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 flex gap-8 items-center justify-center bg-main">
      <TouchableOpacity
        className="px-4 py-2 bg-primary rounded-xl shadow-sm shadow-primary"
        onPress={() => router.push("/screens/auth/login")}
      >
        <Text className="text-white font-regular font-extrabold text-xl">
          Log in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="px-4 py-2 bg-primary rounded-xl shadow-sm shadow-primary"
        onPress={() => router.push("/screens/auth/register")}
      >
        <Text className="text-white font-regular font-extrabold text-xl">
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="px-4 py-2 bg-primary rounded-xl shadow-sm shadow-primary"
        onPress={() => router.push("/screens/auth/reset")}
      >
        <Text className="text-white font-regular font-extrabold text-xl">
          Reset password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="px-4 py-2 bg-primary rounded-xl shadow-sm shadow-primary"
        onPress={() => router.push("/screens/auth/confirm")}
      >
        <Text className="text-white font-regular font-extrabold text-xl">
          Confirm email
        </Text>
      </TouchableOpacity>
    </View>
  );
}
