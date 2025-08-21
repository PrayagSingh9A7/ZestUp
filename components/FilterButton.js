import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function FilterButton({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#ff7043', padding: 10, borderRadius: 20, marginRight: 8 }}>
      <Text style={{ color: '#fff', fontWeight: '700' }}>{label}</Text>
    </TouchableOpacity>
  );
}