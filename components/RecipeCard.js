import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function RecipeCard({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
        {!!(recipe.category || recipe.area) && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {recipe.category}{recipe.category && recipe.area ? " • " : ""}{recipe.area}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", marginBottom: 12, borderRadius: 14, overflow: "hidden", elevation: 3 },
  image: { width: "100%", height: 180 },
  info: { padding: 12 },
  title: { fontSize: 18, fontWeight: "700", color: "#222" },
  subtitle: { fontSize: 13, color: "#666", marginTop: 4 },
});