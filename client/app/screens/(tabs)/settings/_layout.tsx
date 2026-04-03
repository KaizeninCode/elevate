import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ScripturesLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='about'/>
      <Stack.Screen name='help'/>
      <Stack.Screen name='privacy'/>
      <Stack.Screen name='profile'/>
      <Stack.Screen name='preferences'/>
    </Stack>
  )
}

export default ScripturesLayout