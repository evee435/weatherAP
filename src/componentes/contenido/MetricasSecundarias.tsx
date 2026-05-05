import { View, Text, StyleSheet } from "react-native";

export default function MetricasSecundarias({
  humidity,
  pressure,
  wind,
}: {
  humidity: number;
  pressure: number;
  wind: number;
}) {
 return (
    <View style={styles.container}>
     <View testID="metric-item-humidity" style={styles.metric}>
  <Text testID="metric-icon-humidity">💧</Text>
  <Text testID="metric-value-humidity">{humidity}%</Text>
</View>

<View testID="metric-item-pressure" style={styles.metric}>
  <Text testID="metric-icon-pressure">🌡️</Text>
  <Text testID="metric-value-pressure">{pressure} hPa</Text>
</View>

<View testID="metric-item-wind" style={styles.metric}>
  <Text testID="metric-icon-wind">🌬️</Text>
  <Text testID="metric-value-wind">{wind} m/s</Text>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  metric: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
});