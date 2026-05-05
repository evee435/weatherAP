import { Text, StyleSheet } from "react-native";

export default function HeaderCiudad({ city }: { city: string }) {
  return (
    <Text testID="header-city" style={styles.text}>
      {city}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  fontWeight: "800",
  letterSpacing: 2,
  textAlign: "center",
  marginTop: 10,
  },
});