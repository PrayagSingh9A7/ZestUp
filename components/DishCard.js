import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';

export default function DishCard({ meal, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', marginBottom: 12, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' }}
    >
      <Image source={{ uri: meal.strMealThumb }} style={{ width: 100, height: 100 }} />
      <View style={{ padding: 12, justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '700' }}>{meal.strMeal}</Text>
      </View>
    </TouchableOpacity>
  );
}