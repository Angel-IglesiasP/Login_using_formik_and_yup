import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function RegisterPage() {
  const router = useRouter();

  const cloudIcon = [
    { top: 60, left: -25 },
    { top: 150, left: 10 },
    { top: 15, left: 80 },
    { top: 85, left: 190 },
    { top: 155, left: 270 },
    { top: 40, left: 320 },
  ];

  return (
    <View style={styles.screen}>
      {cloudIcon.map((pos, index) => (
        <Image
          key={index}
          source={require("../../assets/images/cloud-icon.png")}
          style={[styles.logo, pos]}
          resizeMode="contain"
        />
      ))}
      <View>
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
      <Image
        source={require("../../assets/images/ground-con.png")}
        style={styles.ground}
        resizeMode="stretch"
      />
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
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 50,
  },
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
  ground: {
    width: "200%",
    height: "25%",
    position: "absolute",
    bottom: 0,
  },
});
