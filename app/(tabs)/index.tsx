import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Account Page</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>Account Login</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.navigate("/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Text style={styles.bodyText}>Account Register</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.navigate("/signup")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#b4c6db",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  header: { margin: 10 },
  headerText: { fontSize: 30, fontWeight: "700" },

  body: { alignItems: "center", margin: 10, marginHorizontal: 20, gap: 10 },
  bodyText: { fontSize: 15, fontWeight: "500" },

  button: {
    backgroundColor: "#006eff",
    borderRadius: 5,
    padding: 10,
    maxWidth: 250,
    borderColor: "#252222",
    borderWidth: 1,
    marginTop: 5,
    width: 80,
    alignItems: "center",
  },
  buttonText: { fontSize: 15, fontWeight: "500", color: "white" },
});
