import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (cityName) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const saveToLocalStorage = (cityData) => {
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    // Удаляем город, если он уже есть, чтобы не дублировать
    cities = cities.filter((city) => city.name !== cityData.name);
    cities.unshift(cityData);
    // Оставляем только 5 последних городов
    if (cities.length > 5) {
      cities.pop();
    }
    // Сохраняем в localStorage
    localStorage.setItem("recentCities", JSON.stringify(cities));
  };

  const apiKey = "b29853ebed56f0c900bd6775b4c3102e";
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  const getData = () => {
    axios(currentWeatherUrl).then((res) => {
      setCurrentWeather(res.data);
      saveToLocalStorage(res.data);
      const { lat, lon } = res.data.coord;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${apiKey}&units=metric`;
      axios.get(forecastUrl).then((res) => {
        // console.log(res.data.list);

        const dailyForecast = res.data.list;
        setForecast(dailyForecast);
      });
    });
  };

  useEffect(() => {
    getData();
  }, [cityName]);
  console.log(currentWeather);

  return { currentWeather, forecast };
};

export default useFetch;
