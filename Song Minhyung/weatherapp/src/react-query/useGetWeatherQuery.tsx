// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

import axios from 'axios';
import { useQuery } from 'react-query';

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const getData = async (lat: number, lon: number) => {
  try {
    const res = await axios.get<WeatherData>(
      process.env.REACT_APP_WEATHER_URL as string,
      {
        params: {
          lat,
          lon,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
        },
      },
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const useGetWeatherQuery = (lat: number, lon: number) => {
  return useQuery(['weather', lat, lon], () => getData(lat, lon), {
    suspense: true,
  });
};
export default useGetWeatherQuery;
