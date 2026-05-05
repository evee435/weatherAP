import { View, Text, StyleSheet } from "react-native";

export default function TemperaturasMinMax({
  min,
  max,
}: {
  min: number;
  max: number;
}) {
  return (
    <View style={styles.container}>
      <Text testID="temp-min">{min}°</Text>
      <Text testID="temp-max">{max}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    alignSelf: "center",
  },
});