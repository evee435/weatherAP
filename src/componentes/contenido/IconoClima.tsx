import { View, Text, StyleSheet } from "react-native";

export default function IconoClima({ condition }: { condition: string }) {
  let icon = "☀️";

  if (condition === "rain") icon = "🌧️";
  if (condition === "cloudy") icon = "☁️";

 return (
    <View
      testID={`icon-weather-${condition}`}
      accessibilityRole="image"
      style={styles.container}
    >
      <Text style={styles.icon}>{icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  icon: {
    fontSize: 90,
  },
});