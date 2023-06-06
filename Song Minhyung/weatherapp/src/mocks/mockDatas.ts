import { WeatherData } from '../react-query/useGetWeatherQuery';

export const weatherMock: WeatherData = {
  coord: {
    lon: 10.99,
    lat: 44.34,
  },
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d',
    },
  ],
  base: 'stations',
  main: {
    temp: 123.456,
    feels_like: 291.96,
    temp_min: 288.12,
    temp_max: 293.82,
    pressure: 1015,
    humidity: 60,
    sea_level: 1015,
    grnd_level: 931,
  },
  visibility: 7731,
  wind: {
    speed: 1.21,
    deg: 45,
    gust: 0.9,
  },
  clouds: {
    all: 37,
  },
  dt: 1686056022,
  sys: {
    type: 2,
    id: 2004688,
    country: 'IT',
    sunrise: 1686022389,
    sunset: 1686077785,
  },
  timezone: 7200,
  id: 3163858,
  name: 'Zocca',
  cod: 200,
};
