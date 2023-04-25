import PickCity from '../PickCity/PickCity';
import ErrorBox from '../ErrorBox/ErrorBox';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = (props) => {
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleCityChange = useCallback((city) => {
    console.log(city);
    setLoading(true);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f650f2f70127be63a3bf61f8bbe6c7b7&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          console.log(data);
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setWeather(weatherData);
          setLoading(false);
        });
      } else {
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !loading && <WeatherSummary {...weather} />}
      {loading && !error && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
