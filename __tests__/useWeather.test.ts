import { renderHook, waitFor } from "@testing-library/react-native";
import { useWeather } from "../src/hooks/useWeather";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({ coords: { latitude: -34.6, longitude: -58.4 } })
  ),
}));

const mockForecast = {
  location: { name: "Lomas de Zamora" },
  current: {
    temp_c: 23.4,
    humidity: 73,
    pressure_mb: 1013,
    wind_kph: 5,
    condition: { code: 1000 },
  },
  forecast: {
    forecastday: [
      {
        day: {
          maxtemp_c: 24,
          mintemp_c: 13,
          avgtemp_c: 17,
          avghumidity: 73,
          maxwind_kph: 10,
          condition: { code: 1003 },
        },
        hour: Array(24).fill({ pressure_mb: 1013 }),
      },
      {
        day: {
          maxtemp_c: 22,
          mintemp_c: 11,
          avgtemp_c: 16,
          avghumidity: 65,
          maxwind_kph: 8,
          condition: { code: 1006 },
        },
        hour: Array(24).fill({ pressure_mb: 1010 }),
      },
    ],
  },
};

const mockHistory = {
  forecast: {
    forecastday: [
      {
        day: {
          maxtemp_c: 18,
          mintemp_c: 10,
          avgtemp_c: 14,
          avghumidity: 80,
          maxwind_kph: 12,
          condition: { code: 1180 },
        },
        hour: Array(24).fill({ pressure_mb: 1015 }),
      },
    ],
  },
};

global.fetch = jest.fn((url: string) => {
  if (url.includes("forecast.json")) {
    return Promise.resolve({ json: () => Promise.resolve(mockForecast) });
  }
  return Promise.resolve({ json: () => Promise.resolve(mockHistory) });
}) as jest.Mock;

describe("useWeather", () => {

  test("arranca con loading en true", () => {
    const { result } = renderHook(() => useWeather());
    expect(result.current.loading).toBe(true);
  });

  test("arranca con weatherData vacío", () => {
    const { result } = renderHook(() => useWeather());
    expect(result.current.weatherData).toEqual([]);
  });

  test("carga los datos correctamente", async () => {
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.weatherData.length).toBe(3);
  });

  test("loading pasa a false después de cargar", async () => {
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.loading).toBe(false);
  });

  test("no hay error cuando la API responde bien", async () => {
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
  });

  test("devuelve el nombre de la ciudad", async () => {
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.ciudad).toBe("Lomas de Zamora");
  });

  test("devuelve exactamente 3 días", async () => {
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.weatherData.length).toBe(3);
  });

  test("hoy tiene la temperatura actual de current", async () => {
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.weatherData[1].temp).toBe(23); // Math.round(23.4)
  });

  test("cada día tiene las propiedades necesarias", async () => {
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    result.current.weatherData.forEach((dia) => {
      expect(dia).toHaveProperty("day");
      expect(dia).toHaveProperty("temp");
      expect(dia).toHaveProperty("min");
      expect(dia).toHaveProperty("max");
      expect(dia).toHaveProperty("humidity");
      expect(dia).toHaveProperty("pressure");
      expect(dia).toHaveProperty("wind");
      expect(dia).toHaveProperty("condition");
    });
  });

  test("condition es un valor válido", async () => {
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    const validConditions = ["sunny", "partly-cloudy", "cloudy", "rain", "snow", "thunder"];
    result.current.weatherData.forEach((dia) => {
      expect(validConditions).toContain(dia.condition);
    });
  });

  test("setea error si no hay permiso de ubicación", async () => {
    const Location = require("expo-location");
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: "denied" });
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Se necesita permiso de ubicación");
  });

  test("setea error si la API falla", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    const { result } = renderHook(() => useWeather());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("No se pudo cargar el clima");
  });

});