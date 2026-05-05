import { Sun, CloudRain, Cloud } from "lucide-react-native";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default function IconoClima({ condition }: { condition: string }) {
  const size = 90;
  const strokeWidth = 1.5;

  return (
    <View testID={`icon-weather-${condition}`} accessibilityRole="image" style={styles.container}>
      {condition === "sunny" && <Sun size={size} strokeWidth={strokeWidth} color="#000" />}
      {condition === "rain" && <CloudRain size={size} strokeWidth={strokeWidth} color="#000" />}
      {condition === "cloudy" && <Cloud size={size} strokeWidth={strokeWidth} color="#000" />}
    </View>
  );
}