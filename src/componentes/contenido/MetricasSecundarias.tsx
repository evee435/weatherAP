import { View, Text, StyleSheet } from "react-native";
import { Droplets, Gauge, Wind } from "lucide-react-native";

export default function MetricasSecundarias({
  humidity, pressure, wind,
}: {
  humidity: number;
  pressure: number;
  wind: number;
}) {
  return (
    <View style={styles.container}>
      <View testID="metric-item-humidity" style={styles.metric}>
        <Droplets size={18} strokeWidth={1.5} color="#555" />
        <Text testID="metric-value-humidity" style={styles.value}>{humidity}<Text style={styles.unit}>%</Text></Text>
      </View>

      <View testID="metric-item-pressure" style={styles.metric}>
        <Gauge size={18} strokeWidth={1.5} color="#555" />
        <Text testID="metric-value-pressure" style={styles.value}>{pressure}<Text style={styles.unit}> hPa</Text></Text>
      </View>

      <View testID="metric-item-wind" style={styles.metric}>
        <Wind size={18} strokeWidth={1.5} color="#555" />
        <Text testID="metric-value-wind" style={styles.value}>{wind}<Text style={styles.unit}> m/s</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginTop: 10,
    gap: 10,
  },
  metric: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },
  unit: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888",
  },
});