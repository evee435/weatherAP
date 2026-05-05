import { useEffect, useState } from "react";
import * as Location from "expo-location";

const API_KEY = "6cd04514d21f48939e7203340260305";

function getFecha(offsetDias: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDias);
  return d.toISOString().split("T")[0];
}

function getFechaLabel(offsetDias: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDias);
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "numeric" });
}

export function useWeather() {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ciudad, setCiudad] = useState("Mi ubicación");



  useEffect(() => {
    async function fetchAll() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Se necesita permiso de ubicación");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;
        const coords = `${latitude},${longitude}`;

        const ayerFecha = getFecha(-1);
        const [forecast, history] = await Promise.all([
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords}&days=2&lang=es`).then(r => r.json()),
          fetch(`https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${coords}&dt=${ayerFecha}&lang=es`).then(r => r.json()),
        ]);
        console.log("CURRENT:", JSON.stringify(forecast.current));
        console.log("HOY DIA:", JSON.stringify(forecast.forecast.forecastday[0].day));

        setCiudad(forecast.location.name);

const parseDia = (day: any, label: string) => ({
  day: label,
  temp: Math.round(day.day.maxtemp_c),
  min: Math.round(day.day.mintemp_c),
  max: Math.round(day.day.maxtemp_c),
  humidity: day.day.avghumidity,
  pressure: day.hour[12]?.pressure_mb ?? 1013,
  wind: Math.round(day.day.maxwind_kph / 3.6),
  condition: mapCondition(day.day.condition.code),
});

const current = forecast.current;

setWeatherData([
  parseDia(history.forecast.forecastday[0], getFechaLabel(-1)),
  {
    day: getFechaLabel(0),
    temp: Math.round(current.temp_c),                          
    min: Math.round(forecast.forecast.forecastday[0].day.mintemp_c),
    max: Math.round(forecast.forecast.forecastday[0].day.maxtemp_c),
    humidity: current.humidity,                                
    pressure: Math.round(current.pressure_mb),                 
    wind: Math.round(current.wind_kph / 3.6),                  
    condition: mapCondition(current.condition.code),          
  },
  parseDia(forecast.forecast.forecastday[1], getFechaLabel(1)),
]);
console.log("HOY SETEADO:", Math.round(current.temp_c)); // <-- acá

      } catch (e) {
        setError("No se pudo cargar el clima");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { weatherData, loading, error, ciudad };
}

function mapCondition(code: number): string {
  const rain = [1063,1072,1150,1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1204,1207,1240,1243,1246,1249,1252];
  const snow = [1066,1069,1114,1117,1210,1213,1216,1219,1222,1225,1255,1258,1261,1264];
  const thunder = [1087,1273,1276,1279,1282];
  const cloudy = [1006,1009];
  const partlyCloudy = [1003];

  if (thunder.includes(code)) return "thunder";
  if (snow.includes(code)) return "snow";
  if (rain.includes(code)) return "rain";
  if (cloudy.includes(code)) return "cloudy";
  if (partlyCloudy.includes(code)) return "partly-cloudy";
  return "sunny";
}