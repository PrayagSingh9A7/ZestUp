import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import RecipeCard from "../components/RecipeCard";
import { searchMealsByName, listCategories, filterByCategory } from "../utils/api";

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [lastQuery, setLastQuery] = useState("chicken");


  const loadInitial = async (category = activeCategory, search = query || lastQuery) => {
    setLoading(true);
    try {
      let data;
      if (category === "All") {
        data = await searchMealsByName(search);
      } else {
        data = await filterByCategory(category);
      }

      const resCats = await listCategories();
      setMeals(data || []);
      setCategories(["All", ...(resCats || [])]);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitial();
  }, []);


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadInitial();
    setRefreshing(false);
  }, [activeCategory, query]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.trim().length === 0) {
      // Reset if cleared
      setLastQuery("chicken");
      loadInitial("All", "chicken");
      return;
    }
    setLoading(true);
    try {
      const data = await searchMealsByName(text);
      setMeals(data || []);
      setActiveCategory("All");
      setLastQuery(text);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = async (cat) => {
    setActiveCategory(cat);
    setQuery("");
    setLoading(true);
    try {
      let data;
      if (cat === "All") {
        data = await searchMealsByName(lastQuery);
      } else {
        data = await filterByCategory(cat);
      }
      setMeals(data || []);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍴 Recipe Explorer</Text>

      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Search recipes (e.g., pasta, biryani)"
        placeholderTextColor="#888"
        style={styles.search}
      />

    
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
        renderItem={({ item }) => (
          <Text
            onPress={() => handleCategoryPress(item)}
            style={[styles.catChip, item === activeCategory && styles.catChipActive]}
          >
            {item}
          </Text>
        )}
      />

      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" />
          <Text style={{ color: "#666", marginTop: 8 }}>Loading recipes…</Text>
        </View>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={{
                id: item.idMeal,
                title: item.strMeal,
                image: item.strMealThumb,
                category: item.strCategory,
                area: item.strArea,
              }}
              onPress={() => router.push(`/recipe/${item.idMeal}`)}
            />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No recipes found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  header: { fontSize: 28, fontWeight: "800", color: "#222", marginTop: 40, marginBottom: 8, textAlign: "center" },
  search: {
    marginHorizontal: 12,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  loaderWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { textAlign: "center", color: "#666", marginTop: 32 },
  catChip: {
    backgroundColor: "#fff",
    color: "#333",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    height: 35,
    marginBottom: 20,
  },
  catChipActive: { backgroundColor: "#222", color: "#fff", borderColor: "#222" },
});














//  import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { useRouter } from "expo-router";
// import RecipeCard from "../components/RecipeCard";
// import {
//   searchMealsByName,
//   listCategories,
//   filterByCategory,
//   listAreas,
//   filterByArea
// } from "../utils/api";

// export default function HomeScreen() {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [categories, setCategories] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [activeArea, setActiveArea] = useState("All");

//   const [lastQuery, setLastQuery] = useState("chicken");

//   const vegCategories = ["Vegetarian", "Vegan"];
//   const nonVegCategories = [
//     "Chicken",
//     "Beef",
//     "Pork",
//     "Seafood",
//     "Lamb",
//     "Goat",
//   ];

//   const loadInitial = async () => {
//     setLoading(true);
//     try {
//       const [resCats, resAreas] = await Promise.all([
//         listCategories(),
//         listAreas(),
//       ]);
//       setCategories(["All", ...(resCats || [])]);
//       setAreas(["All", ...(resAreas || [])]);
//       await applyFilters("All", "All", lastQuery);
//     } catch (e) {
//       console.warn(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyFilters = async (category, area, search) => {
//     setLoading(true);
//     try {
//       let data = [];
//       if (category === "Veg") {
//         const vegResults = await Promise.all(
//           vegCategories.map((cat) => filterByCategory(cat))
//         );
//         data = [].concat(...vegResults);
//       } else if (category === "Non-Veg") {
//         const nonVegResults = await Promise.all(
//           nonVegCategories.map((cat) => filterByCategory(cat))
//         );
//         data = [].concat(...nonVegResults);
//       } else if (category !== "All") {
//         data = await filterByCategory(category);
//       } else if (search) {
//         data = await searchMealsByName(search);
//       }

//       if (area !== "All") {
//         const areaFiltered = await filterByArea(area);
//         data = data.filter((meal) =>
//           areaFiltered.some((a) => a.idMeal === meal.idMeal)
//         );
//       }

//       setMeals(data);
//     } catch (e) {
//       console.warn(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadInitial();
//   }, []);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await applyFilters(activeCategory, activeArea, query || lastQuery);
//     setRefreshing(false);
//   }, [activeCategory, activeArea, query, lastQuery]);

//   const handleSearch = (text) => {
//     setQuery(text);
//     setLastQuery(text || lastQuery);
//     setActiveCategory("All");
//     applyFilters("All", activeArea, text);
//   };

//   const handleCategoryPress = (cat) => {
//     setActiveCategory(cat);
//     setQuery("");
//     applyFilters(cat, activeArea, lastQuery);
//   };

//   const handleAreaPress = (ar) => {
//     setActiveArea(ar);
//     applyFilters(activeCategory, ar, query || lastQuery);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🍴 Recipe Explorer</Text>

//       <TextInput
//         value={query}
//         onChangeText={handleSearch}
//         placeholder="Search recipes..."
//         style={styles.search}
//       />

//       {/* Category Filters */}
//       <FlatList
//         data={["All", "Veg", "Non-Veg", ...categories.filter((c) => !vegCategories.concat(nonVegCategories).includes(c))]}
//         horizontal
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <Text
//             onPress={() => handleCategoryPress(item)}
//             style={[
//               styles.chip,
//               item === activeCategory && styles.chipActive,
//             ]}
//           >
//             {item}
//           </Text>
//         )}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}
//       />

//       {/* Area Filters */}
//       <FlatList
//         data={areas}
//         horizontal
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <Text
//             onPress={() => handleAreaPress(item)}
//             style={[
//               styles.chip,
//               item === activeArea && styles.chipActive,
//             ]}
//           >
//             {item}
//           </Text>
//         )}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}
//       />

//       {loading ? (
//         <View style={styles.loaderWrap}>
//           <ActivityIndicator size="large" />
//           <Text style={{ color: "#666", marginTop: 8 }}>Loading recipes…</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={meals}
//           keyExtractor={(item) => item.idMeal}
//           contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           renderItem={({ item }) => (
//             <RecipeCard
//               recipe={{
//                 id: item.idMeal,
//                 title: item.strMeal,
//                 image: item.strMealThumb,
//                 category: item.strCategory,
//                 area: item.strArea,
//               }}
//               onPress={() => router.push(`/recipe/${item.idMeal}`)}
//             />
//           )}
//           ListEmptyComponent={
//             <Text style={styles.empty}>No recipes found.</Text>
//           }
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f7f7f7" },
//   header: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#222",
//     marginTop: 40,
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   search: {
//     marginHorizontal: 12,
//     marginBottom: 10,
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#ececec",
//   },
//   chip: {
//     backgroundColor: "#fff",
//     color: "#333",
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 999,
//     borderWidth: 1,
//     borderColor: "#e5e5e5",
//     height: 35,
//   },
//   chipActive: {
//     backgroundColor: "#222",
//     color: "#fff",
//     borderColor: "#222",
//   },
//   loaderWrap: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   empty: {
//     textAlign: "center",
//     color: "#666",
//     marginTop: 32,
//   },
// });