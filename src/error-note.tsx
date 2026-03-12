import { StyleSheet, Text } from "react-native";

type Props = {
  message?: string;
};

export function FormErrorNote({ message }: Props) {
  if (!message) return null;
  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: { color: "#f00", marginHorizontal: 20 },
});
