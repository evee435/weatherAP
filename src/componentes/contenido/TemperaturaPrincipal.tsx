import { Text, StyleSheet } from "react-native";

export default function TemperaturaPrincipal({ temp }: { temp: number }) {
  return (
    <Text testID="temp-current" style={styles.text}>
  {`${temp}°`}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 60,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "300",

  },
});