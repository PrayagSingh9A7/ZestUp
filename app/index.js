import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: "https://images.stockcake.com/public/e/1/f/e1f70b6d-a938-443c-a07f-62f06026c1c9_large/steaming-culinary-symphony-stockcake.jpg",
      }}
      style={styles.bgImage}
    >
      {/* Overlay for better text visibility */}
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>🍲 Food Recipe App</Text>
          <Text style={styles.subtitle}>
            Discover delicious recipes & start your cooking journey
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/inner")}
          >
            <Text style={styles.buttonText}>Get Started →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // dark overlay
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ff914d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
