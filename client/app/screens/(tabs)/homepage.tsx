import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import useDailyContent from "../../hooks/useDailyContent.js";

type WordOfTheDay = {
  reference: string;
  text: string;
  bookId: string;
  chapter: Number;
  verse: Number;
};

type Devotional = {
  reflection: string;
  attribution?: string;
  title: string;
  body: string;
};

const HomePage = () => {
  const { data, error, loading } = useDailyContent();
  console.log(data)

  if (loading) return <ActivityIndicator className="flex-1 bg-main" />;
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-main items-center justify-center">
        <Text>Could not load today's word of the day.</Text>
      </SafeAreaView>
    );
  }
  if (!data) return <View className="flex-1 bg-main" />;

  const {
    wordOfTheDay,
    devotional,
  }: { wordOfTheDay: WordOfTheDay; devotional: Devotional } = data
  return (
    <View className=" bg-main flex-1 items-center justify-start">
      <View className="bg-primary w-full h-1/2 p-3 items-center justify-center">
        <SafeAreaView className="w-full h-4/5 gap-y-4">
          <Text className="text-white text-2xl text-center font-instrumentBold uppercase">
            Word of the day
          </Text>
          <Text className="font-playful text-white text-4xl text-center">
            {wordOfTheDay.reference}
          </Text>
          <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
            <Text className="font-playful text-2xl text-white text-left">
              {wordOfTheDay.text}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* DEVOTIONAL SUMMARY */}
      <View className="w-full h-2/5 p-3 items-center justify-center gap-y-4">
        
        <Text className="text-primary text-2xl text-center font-instrumentBold">
          {devotional.title}
        </Text>
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          <Text className="font-instrumentRegular text-xl">
            {devotional.body}
          </Text>
          <Text className="font-instrumentBold text-xl mt-4">
            {devotional.reflection}
          </Text>
          {devotional.attribution && (
            <Text className="font-instrumentRegular text-xl">
              {devotional.attribution}
            </Text>
          )}
        </ScrollView>
      </View>

      {/* <AppButton
        title="Back to starter screen"
        onPress={() => router.push("/screens/auth/login")}
      /> */}
    </View>
  );
};

export default HomePage;
