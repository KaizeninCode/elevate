import {
  View,
  Text,
  Platform,
  Image,
  ImageSourcePropType,
  ColorValue,
} from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface TabIconProps {
  focused: boolean;
  size: number;
  color: ColorValue;
  name: React.ComponentProps<typeof Ionicons>["name"];
}

const TabIcon = ({ size, color, name }: TabIconProps) => (
  <Ionicons name={name} size={size} color={color} />
);

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="homepage"
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#696047",
          borderRadius: 40,
          paddingBottom: 30,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="homepage"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scriptures"
        options={{
          title: "Scriptures",
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon
              name={focused ? "book" : "book-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon
              name={focused ? "bookmarks" : "bookmarks-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
