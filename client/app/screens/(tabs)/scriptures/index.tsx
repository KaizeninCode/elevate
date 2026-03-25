import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";

const searchData = [
  {
    id: '1',
    title: 'Search 1',
    date: '20th March, 2025',
  },
  {
    id: '2',
    title: 'Search 2',
    date: '20th March, 2025',
  },
  {
    id: '3',
    title: 'Search 3',
    date: '20th March, 2025',
  },
  {
    id: '4',
    title: 'Search 4',
    date: '20th March, 2025',
  },
  {
    id: '5',
    title: 'Search 5',
    date: '20th March, 2025',
  },
  {
    id: '6',
    title: 'Search 6',
    date: '20th March, 2025',
  },
  {
    id: '7',
    title: 'Search 7',
    date: '20th March, 2025',
  },
  {
    id: '8',
    title: 'Search 8',
    date: '20th March, 2025',
  },
  {
    id: '9',
    title: 'Search 9',
    date: '20th March, 2025',
  },
  {
    id: '10',
    title: 'Search 10',
    date: '20th March, 2025',
  },
]

type SearchItemProps = {
  title: string
  date: string
}

const SearchItem = ({title, date}:SearchItemProps) => (
  <View className="bg-secondary rounded-xl my-1 p-4">
    <View className="flex flex-row items-center justify-between">
      <Text className="font-instrumentRegular text-xl">{title}</Text>
      <Text className="font-instrumentRegular text-sm text-right">{date}</Text>
    </View>
      <Text className="font-instrumentRegular text-sm text-left mt-2">{title}</Text>
  </View>
)

const Scriptures = () => {
  return (
    <SafeAreaView className=" bg-main px-5 py-10 flex-1 items-center justify-center">
      {/* BOOK AND CHAPTER INPUTS */}
      <View className="gap-y-4 w-full">
        <TextInput
          className="border border-primary p-4 rounded-xl"
          placeholder="Book"
          placeholderTextColor="gray"
        />
        <TextInput
          className="border border-primary p-4 rounded-xl"
          placeholder="Chapter"
          placeholderTextColor="gray"
        />
      </View>
      {/* READ & LISTEN BUTTONS */}
      <View className="mt-8 gap-x-12 w-full flex-row items-center justify-center">
        <TouchableOpacity
          className="rounded-full size-28 bg-primary items-center justify-center p-3"
          onPress={() => router.push("/screens/(tabs)/scriptures/read")}
        >
          <Text className="font-playful uppercase text-white text-3xl">
            Read
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full size-28 bg-primary items-center justify-center"
          onPress={() => router.push("/screens/(tabs)/scriptures/listen")}
        >
          <Text className="font-playful uppercase text-white text-3xl">
            Listen
          </Text>
        </TouchableOpacity>
      </View>
      {/* RECENT SEARCHES LIST */}
      <Text className="font-instrumentBold text-primary text-2xl mt-16">Recent Searches</Text>
        <FlatList
          data={searchData}
          renderItem={({item}) =>  <SearchItem title={item.title} date={item.date}/>}
          keyExtractor={item => item.id}
          className="w-full my-4"
        />
      
      {/* <AppButton title="Back to starter screen" onPress={() => router.push('/screens/auth/login')}/> */}
    </SafeAreaView>
  );
};

export default Scriptures;
