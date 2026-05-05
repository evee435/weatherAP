import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

export default function NavegacionDias({
  day, onPrev, onNext,
}: {
  day: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <View testID="day-navigation" style={styles.container}>
  <Pressable testID="button-prev-day" onPress={onPrev}>
    <ChevronLeft size={20} strokeWidth={1.5} color="#111" />
  </Pressable>
  <Text testID="navigation-current-day" style={styles.day}>{day}</Text>
  <Pressable testID="button-next-day" onPress={onNext}>
    <ChevronRight size={20} strokeWidth={1.5} color="#111" />
  </Pressable>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 8, 
  },
  day: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
    color: "#111",
  },
});