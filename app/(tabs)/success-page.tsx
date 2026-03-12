import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Successfully logging into account</Text>
      <Pressable style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>Press Here to return Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
    width: 250,
  },
  buttonText: { color: "white", fontSize: 15, fontWeight: "500" },
});
