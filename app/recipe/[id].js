import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { lookupMealById } from "../../utils/api";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await lookupMealById(String(id));
        setMeal(data || null);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  const ingredients = useMemo(() => {
    if (!meal) return [];
    const arr = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const mea = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        arr.push(`${ing}${mea && mea.trim() ? ` — ${mea}` : ""}`);
      }
    }
    return arr;
  }, [meal]);

  const videoId = useMemo(() => {
    if (!meal?.strYoutube) return null;
    const url = meal.strYoutube;
    const match = url.match(/(?:v=|\.be\/)\s*([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
  }, [meal]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ color: "#666", marginTop: 8 }}>Loading recipe…</Text>
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Recipe not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Text style={styles.backText}>Go Back</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
     <View style={styles.strt}> <Image source={{ uri: meal.strMealThumb }} style={styles.image} /></View>

      <View style={{ padding: 16 }}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.meta}>{meal.strArea} • {meal.strCategory}</Text>
      </View>

      {videoId && (
        <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
          <Text style={styles.sectionTitle}>Video</Text>
          <YoutubePlayer height={220} play={false} videoId={videoId} />
        </View>
      )}

      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {ingredients.map((line, idx) => (
          <Text key={idx} style={styles.ingredient}>• {line}</Text>
        ))}
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 29 }}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{meal.strInstructions?.trim()}</Text>
      </View>

      <TouchableOpacity style={[styles.backBtn, { alignSelf: "center", marginBottom: 32 }]} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  strt:{height:290,backgroundColor:"#9ffbfcff",borderBottomLeftRadius:20,borderBottomRightRadius:20},
  image: { height: 240,borderRadius:30,marginHorizontal:10,marginTop:40},
  title: { fontSize: 26, fontWeight: "800", color: "#222", marginBottom: 4 },
  meta: { color: "#666" },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8, color: "#222" },
  ingredient: { fontSize: 16, color: "#444", marginVertical: 4 },
  instructions: { fontSize: 16, color: "#333", lineHeight: 22 },
  backBtn: { backgroundColor: "#222", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, marginTop: 8 },
  backText: { color: "#fff", fontWeight: "700" },
});
