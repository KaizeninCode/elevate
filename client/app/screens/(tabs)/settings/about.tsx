import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-main px-5 py-10 items-center justify-center gap-5">
      <Text className="font-instrumentBold text-3xl text-primary">
        About Elevate
      </Text>
      <ScrollView >
        <Text className="text-xl font-instrumentRegular">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime in cumque doloribus quis repellat omnis, fugiat hic soluta ex natus officiis voluptatum. Sit architecto laudantium iusto deserunt animi est hic fuga maxime, aut explicabo vero reiciendis officiis, dicta ducimus dolore obcaecati praesentium iste totam delectus impedit ipsam autem. Expedita, quae?
        </Text>
        <Text className="text-xl font-instrumentRegular">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime in cumque doloribus quis repellat omnis, fugiat hic soluta ex natus officiis voluptatum. Sit architecto laudantium iusto deserunt animi est hic fuga maxime, aut explicabo vero reiciendis officiis, dicta ducimus dolore obcaecati praesentium iste totam delectus impedit ipsam autem. Expedita, quae?
        </Text>
        <Text className="text-xl font-instrumentRegular">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime in cumque doloribus quis repellat omnis, fugiat hic soluta ex natus officiis voluptatum. Sit architecto laudantium iusto deserunt animi est hic fuga maxime, aut explicabo vero reiciendis officiis, dicta ducimus dolore obcaecati praesentium iste totam delectus impedit ipsam autem. Expedita, quae?
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
