import { useRouter } from "expo-router";
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
    backgroundColor: "#eee",
  },

  header: { margin: 10 },
  headerText: { fontSize: 30, fontWeight: "700" },

  body: { alignItems: "flex-start", margin: 10, marginHorizontal: 20, gap: 10 },
  bodyText: { fontSize: 15, fontWeight: "500" },

  button: {
    alignItems: "center",
    backgroundColor: "#aaa",
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 15,
    width: 100,
  },
  buttonText: { fontSize: 15, fontWeight: "500", color: "white" },
});
