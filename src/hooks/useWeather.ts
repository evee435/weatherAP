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
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "numeric" }); // "4/05"
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

        setCiudad(forecast.location.name);
        const horaActual = forecast.current.temp_c;

        const parseDia = (day: any, label: string, tempOverride?: number) => ({
  day: label,
  temp: Math.round(tempOverride ?? day.day.avgtemp_c), 
  min: Math.round(day.day.mintemp_c),
  max: Math.round(day.day.maxtemp_c),
  humidity: day.day.avghumidity,
  pressure: day.hour[12]?.pressure_mb ?? 1013,
  wind: Math.round(day.day.maxwind_kph / 3.6),
  condition: mapCondition(day.day.condition.code),
});

        setWeatherData([
          parseDia(history.forecast.forecastday[0], getFechaLabel(-1)),
          parseDia(forecast.forecast.forecastday[0], getFechaLabel(0), horaActual),
          parseDia(forecast.forecast.forecastday[1], getFechaLabel(1)),
        ]);
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
  if ([1063,1180,1183,1186,1189,1192,1195,1240,1243,1246].includes(code)) return "rain";
  if ([1003,1006,1009].includes(code)) return "cloudy";
  return "sunny";
}