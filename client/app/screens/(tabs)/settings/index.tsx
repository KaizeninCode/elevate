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
import HorizontalRule from "@/components/HorizontalRule";

const settingsItems = [
  {
    id: '1',
    title: 'Profile',
    link: '/screens/(tabs)/settings/profile',
  },
  
  {
    id: '2',
    title: 'About Elevate',
    link: '/screens/(tabs)/settings/about',
  },
  
  {
    id: '3',
    title: 'Help and Support',
    link: '/screens/(tabs)/settings/help',
  },
  
  {
    id: '4',
    title: 'Privacy',
    link: '/screens/(tabs)/settings/privacy',
  },
  {
    id: '5',
    title: 'Log Out',
    link: '/screens/auth/login',
  },
  
]

const settingsLinks = [
  '/screens/(tabs)/settings/profile',
  '/screens/(tabs)/settings/about',
  '/screens/(tabs)/settings/help',
  '/screens/(tabs)/settings/privacy',
  '/screens/auth/login',
] as const;

type SettingsLink = typeof settingsLinks[number];

type SettingsItemProps = {
  title: string;
  link: SettingsLink;
};

const SearchItem = ({title, link}:SettingsItemProps) => (
  <View className="my-1 p-4  justify-center">
    <TouchableOpacity className="flex flex-row items-center justify-between" onPress={() => router.push(link)}>
      <Text className="font-instrumentRegular text-xl">{title}</Text>
      <Text> &rarr;</Text>
    </TouchableOpacity>
    <HorizontalRule/>
  </View>
)


const Settings = () => {
  return (
    <SafeAreaView className=" bg-main px-5 py-10 gap-y-4 flex-1 items-center justify-start">
      <Text className="font-bold font-instrumentBold text-primary text-3xl">Settings</Text>
      {/* TOP PART - IMAGE AND NAME */}
      <View className="items-center justify-center gap-5">
        <View className="rounded-full size-24 bg-secondary flex items-center justify-center shadow-md shadow-primary">
          <Text className="font-bold font-instrumentBold text-4xl">AB</Text>
        </View>
        <Text className="font-instrumentMedium text-2xl">Another Boy</Text>
      </View>


      {/* SETTINGS PAGE LIST ITEMS */}
      <FlatList
                data={settingsItems}
                renderItem={({item}) =>  <SearchItem title={item.title} link={item.link}/>}
                keyExtractor={item => item.id}
                className="w-full my-4"
              />
      {/* <AppButton title="Back to starter screen" onPress={() => router.push('/screens/auth/login')}/> */}
    </SafeAreaView>
  );
};

export default Settings;
