import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ScripturesLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='read'/>
      <Stack.Screen name='listen'/>
    </Stack>
  )
}

export default ScripturesLayout