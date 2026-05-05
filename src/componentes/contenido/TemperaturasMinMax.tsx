import { View, Text, StyleSheet } from "react-native";

export default function TemperaturasMinMax({ min, max }: { min: number; max: number }) {
  return (
    <View style={styles.container}>
      <Text testID="temp-min" style={styles.text}>{min}°</Text>
      <Text style={styles.separator}>·</Text>
      <Text testID="temp-max" style={styles.text}>{max}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    alignSelf: "center",
    marginTop: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "300",
    color: "#555",
  },
  separator: {
    fontSize: 18,
    color: "#bbb",
  },
});