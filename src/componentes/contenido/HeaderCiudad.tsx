import { Text, StyleSheet } from "react-native";

export default function HeaderCiudad({ city }: { city: string }) {
  return (
    <Text testID="header-city" style={styles.text}>
      {city}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 4,
    textAlign: "center",
    marginTop: 10,
    color: "#111",
  },
});