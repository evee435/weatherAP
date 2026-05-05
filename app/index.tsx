import {Text} from "react-native";
import { useState } from "react";
import EncabezadoCiudad from "../src/componentes/contenido/EncabezadoCiudad";
import NavegacionDias from "../src/componentes/contenido/NavegacionDias";
import IconoClima from "../src/componentes/contenido/IconoClima";
import MetricasSecundarias from "../src/componentes/contenido/MetricasSecundarias";
import TemperaturaPrincipal from "../src/componentes/contenido/TemperaturaPrincipal";
import TemperaturasMinMax from "../src/componentes/contenido/TemperaturasMinMax";
import {useWeather} from "../src/hooks/useWeather";
import {SafeAreaView } from "react-native-safe-area-context";


export default function App() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const { weatherData, loading, error, ciudad } = useWeather();


   if (loading) return <Text>Cargando...</Text>;
   if (error) return <Text>{error}</Text>;
   if (!weatherData.length) return null;

  const currentDay = weatherData[currentIndex];
  console.log("CURRENT DAY:", currentDay);

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
    
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>

      <NavegacionDias
        day={currentDay.day}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <EncabezadoCiudad city={ciudad.toUpperCase()} />

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

    </SafeAreaView>
  );
}