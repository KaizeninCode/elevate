import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";

const Listen = () => {
  return (
    <View className=" bg-main flex-1 items-center justify-start">
      <View className="bg-primary w-full h-1/2 p-3 items-center justify-center">
        <SafeAreaView className="w-full h-4/5 gap-y-4">
          <Text className="text-white text-6xl text-center font-playful uppercase">
            The book of matthew
          </Text>
          <View className="border border-white px-4 py-2 rounded-full items-center justify-center flex w-3/5 mx-auto">
            <Text className="font-playful text-white text-3xl">
              Chapter 17 
              {/* &#8964; */}
            </Text>
          </View>
          
        </SafeAreaView>
      </View>

      {/* TRANSCRIPT */}

      <ScrollView className="px-5 py-10">
        <Text className="font-instrumentRegular text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit labore nesciunt ut in placeat cum dolorem consectetur voluptatibus quam iusto praesentium numquam nulla laborum, quasi aperiam explicabo quos recusandae illum! Accusamus veniam voluptates perspiciatis cum rem illo odit omnis voluptatum quos. Omnis veniam at eligendi? Ipsum rem officiis enim voluptatum fugit nulla placeat exercitationem commodi itaque in libero porro veniam velit voluptas nemo pariatur sapiente asperiores nihil nisi quisquam necessitatibus, harum quae odio. Nisi velit eos, accusantium, aperiam tempore maiores incidunt veritatis cum vitae culpa eum molestias. Sunt quidem, deleniti eius, ipsa ea perspiciatis consequuntur totam ipsam quibusdam voluptate provident fuga cupiditate tempore maxime at harum asperiores. Distinctio illum, non earum aut iste nam recusandae beatae modi ad, repellendus eligendi similique, voluptatibus aperiam? Aliquid non blanditiis sunt nihil veniam rem facilis quas mollitia ea quo, voluptatibus vero nam aut possimus vitae odio, obcaecati expedita incidunt autem. Quas, aperiam enim dolores accusamus eos architecto, deleniti blanditiis saepe eum ad, debitis at dolorem illum quod adipisci ab cupiditate unde magnam tempora. Quibusdam porro atque neque quidem dolorum repudiandae, officia quasi modi aut, nisi aliquam nesciunt, doloremque excepturi provident? Perspiciatis iusto enim id quo. Quis veniam cum soluta labore mollitia maxime odit porro.
        </Text>
      </ScrollView>

      {/* <AppButton
        title="Back to starter screen"
        onPress={() => router.push("/screens/auth/login")}
      /> */}
    </View>
  );
};

export default Listen;
