import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const searchData = [
  {
    id: "1",
    title: "Search 1",
    date: "20th March, 2025",
  },
  {
    id: "2",
    title: "Search 2",
    date: "20th March, 2025",
  },
  {
    id: "3",
    title: "Search 3",
    date: "20th March, 2025",
  },
  {
    id: "4",
    title: "Search 4",
    date: "20th March, 2025",
  },
];

type SearchItemProps = {
  title: string;
  date: string;
};

const SearchItem = ({ title, date }: SearchItemProps) => (
  <View className="bg-secondary rounded-xl my-1 p-4">
    <View className="flex flex-row items-center justify-between">
      <Text className="font-instrumentRegular text-xl">{title}</Text>
      <Text className="font-instrumentRegular text-sm text-right">{date}</Text>
    </View>
    <Text className="font-instrumentRegular text-sm text-left mt-2">
      {title}
    </Text>
  </View>
);

const HelpScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-main px-5 py-10 items-center justify-center gap-5">
      <Text className="font-instrumentBold text-3xl text-primary">
        Get in touch with our team
      </Text>
      <FlatList
        data={searchData}
        renderItem={({ item }) => (
          <SearchItem title={item.title} date={item.date} />
        )}
        keyExtractor={(item) => item.id}
        className="w-full my-4"
      />
    </SafeAreaView>
  );
};

export default HelpScreen;
