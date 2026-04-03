import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";

const HomePage = () => {
  return (
    <View className=" bg-main flex-1 items-center justify-start">
      <View className="bg-primary w-full h-1/2 p-3 items-center justify-center">
        <SafeAreaView className="w-full h-4/5 gap-y-4">
          <Text className="text-white text-2xl text-center font-instrumentBold uppercase">
            Word of the day
          </Text>
          <Text className="font-playful text-white text-3xl text-center">
            Lorem ipsum dolor sit amet.
          </Text>
          <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
            <Text className="font-playful text-2xl text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
              distinctio blanditiis repellendus culpa fugiat corrupti veniam,
              alias beatae ea eaque quis, voluptas quas incidunt, saepe ipsam
              molestiae. Et provident magni fugit voluptatem totam vero ipsum
              odio obcaecati, cupiditate, veritatis illum neque blanditiis,
              explicabo aperiam quisquam! Laborum tempore quaerat nihil
              inventore.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* DEVOTIONAL SUMMARY */}
      <View className="w-full h-1/2 p-3 items-center justify-center gap-y-4">
        <Text className="text-primary text-2xl text-center font-instrumentBold">
          Devotional Summary
        </Text>
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          <Text className="font-instrumentRegular text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            distinctio blanditiis repellendus culpa fugiat corrupti veniam,
            alias beatae ea eaque quis, voluptas quas incidunt, saepe ipsam
            molestiae. Et provident magni fugit voluptatem totam vero ipsum odio
            obcaecati, cupiditate, veritatis illum neque blanditiis, explicabo
            aperiam quisquam! Laborum tempore quaerat nihil inventore.
          </Text>
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
