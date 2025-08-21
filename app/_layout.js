import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#ff7043' },
        headerTintColor: '#fff',
        headerShown:false
      }}
    />
  );
}