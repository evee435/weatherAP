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
      <View testID="metric-item" style={styles.metric}>
  <Droplets testID="metric-icon" size={18} strokeWidth={1.5} color="#555" />
  <Text testID="metric-value">{humidity}<Text style={styles.unit}>%</Text></Text>
</View>

<View testID="metric-item" style={styles.metric}>
  <Gauge testID="metric-icon" size={18} strokeWidth={1.5} color="#555" />
  <Text testID="metric-value">{pressure}<Text style={styles.unit}> hPa</Text></Text>
</View>

<View testID="metric-item" style={styles.metric}>
  <Wind testID="metric-icon" size={18} strokeWidth={1.5} color="#555" />
  <Text testID="metric-value">{wind}<Text style={styles.unit}> m/s</Text></Text>
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