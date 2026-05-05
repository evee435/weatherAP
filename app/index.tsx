import { View, StyleSheet, Text} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import HeaderCiudad from "../src/componentes/contenido/HeaderCiudad";
import NavegacionDias from "../src/componentes/contenido/NavegacionDias";
import IconoClima from "../src/componentes/contenido/IconoClima";
import MetricasSecundarias from "../src/componentes/contenido/MetricasSecundarias";
import TemperaturaPrincipal from "../src/componentes/contenido/TemperaturaPrincipal";
import TemperaturasMinMax from "../src/componentes/contenido/TemperaturasMinMax";
import {useWeather} from "../src/hooks/useWeather";


export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { weatherData, loading, error, ciudad } = useWeather();

  <HeaderCiudad city={ciudad.toUpperCase()} />

   if (loading) return <Text>Cargando...</Text>;
   if (error) return <Text>{error}</Text>;
   if (!weatherData.length) return null;

  const currentDay = weatherData[currentIndex];

  const handleNext = () => {
    if (currentIndex < weatherData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <LinearGradient colors={["#e8edf2", "#f5f7f9", "#ffffff"]} style={{ flex: 1 }}>
       <View testID="screen-weather" style={styles.container}>

      <NavegacionDias
        day={currentDay.day}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <HeaderCiudad city={ciudad.toUpperCase()} />

      <IconoClima condition={currentDay.condition} />

      <MetricasSecundarias
        humidity={currentDay.humidity}
        pressure={currentDay.pressure}
        wind={currentDay.wind}
      />

      <TemperaturaPrincipal temp={currentDay.temp} />

      <TemperaturasMinMax
        min={currentDay.min}
        max={currentDay.max}
      />

    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
});