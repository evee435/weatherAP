import { Text, StyleSheet } from "react-native";

export default function EncabezadoCiudad({ city }: { city: string }) {
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
    marginTop: 50,
    color: "#111",
  },
});