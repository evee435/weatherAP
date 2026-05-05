import { Text, StyleSheet } from "react-native";

export default function TemperaturaPrincipal({ temp }: { temp: number }) {
  return (
    <Text testID="temp-current" style={styles.text}>
      {temp}°
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 80,
    fontWeight: "200",
    textAlign: "center",
    marginVertical: 5,
    color: "#111",
    letterSpacing: -2,
    marginTop: 30,
  },
});