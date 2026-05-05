import { render, fireEvent } from '@testing-library/react-native';
import App from '@/app/(tabs)/index';

describe('Weather App', () => {

  test('renderiza la pantalla principal', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('screen-weather')).toBeTruthy();
  });

  test('muestra el nombre de la ciudad', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('header-city').props.children).toBe('PLAYA DEL CARMEN');
  });

  test('permite navegar al día siguiente', () => {
    const { getByTestId } = render(<App />);

    fireEvent.press(getByTestId('button-next-day'));

    expect(getByTestId('day-navigation')).toBeTruthy();
  });

  test('renderiza un ícono climático', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/icon-weather-/)).toBeTruthy();
  });

  test('renderiza al menos tres métricas secundarias', () => {
    const { getAllByTestId } = render(<App />);
    expect(getAllByTestId('metric-item').length).toBeGreaterThanOrEqual(3);
  });

  test('muestra la temperatura actual', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('temp-current').props.children).toMatch(/°/);
  });

  test('muestra temperatura mínima y máxima', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('temp-min')).toBeTruthy();
    expect(getByTestId('temp-max')).toBeTruthy();
  });

});