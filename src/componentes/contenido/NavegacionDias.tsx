import { View, Text, Pressable, StyleSheet } from "react-native";

export default function NavegacionDias({
  day,
  onPrev,
  onNext,
}: {
  day: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <View testID="day-navigation" style={styles.container}>
      <Pressable testID="button-prev-day" onPress={onPrev}>
        <Text>{"<"}</Text>
      </Pressable>

      <Text testID="navigation-current-day">{day}</Text>

      <Pressable testID="button-next-day" onPress={onNext}>
        <Text>{">"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 140,
    alignSelf: "center",
    marginVertical: 15,
  },
});