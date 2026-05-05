import { Sun, CloudRain, Cloud, CloudSnow, CloudLightning, CloudSun } from "lucide-react-native";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default function IconoClima({ condition }: { condition: string }) {
  const size = 90;
  const stroke = 1.5;

  return (
    <View testID={`icon-weather-${condition}`} accessibilityRole="image" style={styles.container}>
      {condition === "sunny" && <Sun size={size} strokeWidth={stroke} color="#000" />}
      {condition === "partly-cloudy" && <CloudSun size={size} strokeWidth={stroke} color="#000" />}
      {condition === "cloudy" && <Cloud size={size} strokeWidth={stroke} color="#000" />}
      {condition === "rain" && <CloudRain size={size} strokeWidth={stroke} color="#000" />}
      {condition === "snow" && <CloudSnow size={size} strokeWidth={stroke} color="#000" />}
      {condition === "thunder" && <CloudLightning size={size} strokeWidth={stroke} color="#000" />}
    </View>
  );
}