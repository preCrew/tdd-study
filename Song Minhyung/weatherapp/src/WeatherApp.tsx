import useGetWeatherQuery from './react-query/useGetWeatherQuery';

const WeatherApp = () => {
  const { data } = useGetWeatherQuery(10.99, 44.34);

  return (
    <>
      <p>cloud: {data?.weather[0].main}</p>
      <p>temp: {data?.main.temp}</p>
      <p>humidity: {data?.main.humidity}</p>
    </>
  );
};

export default WeatherApp;
