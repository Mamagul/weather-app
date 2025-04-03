import React, { useState } from "react";
import "./weather.css";
import { windDirection, isCloud } from "./weatherLogic";
import useFetch from "../hooks/useFetch";
import background from "../media/sky.mp4";
import Spinner from "react-bootstrap/Spinner";
import { WiBarometer, WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import WeatherChart from "./WeatherChart.jsx";

export default function WeatherSearch() {
  const [inputValue, setInputValue] = useState("");
  const [cityName, setCityName] = useState("Ashgabat");
  const { currentWeather, forecast } = useFetch(cityName);
  const { icon, label } = currentWeather
    ? windDirection(currentWeather.wind.deg)
    : { icon: null, label: "?" };
  const handleSearch = (event) => {
    event.preventDefault();
    if (inputValue !== "") {
      setCityName(inputValue);
    }
  };

  return (
    <>
      <video
        src={background}
        autoPlay
        muted
        loop
        className="background_video"
      ></video>
      <div className="weatherSearching container">
        <form className="weather_form">
          <input
            className="weather_input"
            type="text"
            placeholder="Enter your city"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="weather_button" onClick={handleSearch}>
            Search
          </button>
        </form>
        <div>
          {currentWeather ? (
            <div className="weatherInfo">
              <p>
                {currentWeather.name} , {currentWeather.sys.country} <br />
                {isCloud(
                  currentWeather.clouds.all,
                  currentWeather.weather[0].main
                )}
                <span>{Math.round(currentWeather.main.temp - 273.15)}°C</span>
              </p>
              <p className="weather_description">
                Feels like:{" "}
                {Math.round(currentWeather.main.feels_like - 273.15)}°C,
                {currentWeather.weather[0].description}
              </p>
              <p className="weather_description">
                <WiHumidity size={37} /> {currentWeather.main.humidity}% {"   "}
                {icon} {Math.ceil(currentWeather.wind.speed)} m/s {label}
              </p>
              <p className="weather_description">
                <MdOutlineVisibility size={35} />{" "}
                {(currentWeather.visibility / 1000).toFixed(1)} km
                <WiBarometer size={40} /> {currentWeather.main.pressure} hPa
              </p>
            </div>
          ) : (
            <div>
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </div>
        <div className="temperature_chart">
          <WeatherChart forecast={forecast}></WeatherChart>
        </div>
      </div>
    </>
  );
}
