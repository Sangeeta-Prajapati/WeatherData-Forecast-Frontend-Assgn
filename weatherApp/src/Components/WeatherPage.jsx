import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CloudIcon from "../assets/icons/cloud.png";
import rainIcon from "../assets/icons/rain.png";
import sunIcon from "../assets/icons/sun.png";
import clearBg from "../assets/images/Clear.jpg";
import cloudBg from "../assets/images/Cloudy.jpg";
import rainBg from "../assets/images/Rainy.jpg";
import sunnyBg from "../assets/images/Sunny.jpg";
import ForeCast from "./ForeCast";

const WeatherPage = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [wIcons, setWIcons] = useState(sunIcon);
  const [weatherBg, setWeatherBg] = useState(sunnyBg);
  const [currDate, setCurrDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const APIKEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`
        );
        setWeatherData(res.data);
        setLoading(false);
      } catch (err) {
        console.log("Fetching error weather", err);
        if (err.response && err.response.status === 404) {
          setError("City not found. Please check the city name and try again.");
        } else {
          setError("Failed to fetch weather data. Please try again.");
        }
        setLoading(false);
      }
    };

    if (cityName) {
      fetchWeatherData();
    }
  }, [cityName, APIKEY]);

  useEffect(() => {
    if (weatherData && weatherData.weather) {
      const weatherIcon = weatherData.weather[0].main;
      if (weatherIcon === "Clouds") {
        setWIcons(CloudIcon);
        setWeatherBg(cloudBg);
      } else if (weatherIcon === "Rain") {
        setWIcons(rainIcon);
        setWeatherBg(rainBg);
      } else if (weatherIcon === "Clear") {
        setWIcons(sunIcon);
        setWeatherBg(sunnyBg);
      } else {
        setWIcons(sunIcon);
        setWeatherBg(clearBg);
      }
    }
 
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrDate(date.toLocaleDateString("en-Us", options));
  }, [weatherData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="text-center bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-white border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-white mb-2">Loading Weather Data</h2>
          <p className="text-blue-100 text-lg">Please wait while we fetch the latest information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 via-red-500 to-red-600">
        <div className="text-center bg-white rounded-3xl p-12 shadow-2xl max-w-md mx-4">
          <div className="text-6xl mb-6">😞</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${weatherBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with back button */}
        <div className="p-6">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-30 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </Link>
        </div>

        {/* Main weather content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
              
              {/* Current Weather Card */}
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-30">
                {/* Location and Date */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {weatherData.name}
                  </h1>
                  <p className="text-xl text-white text-opacity-90 mb-1">
                    {weatherData.sys.country}
                  </p>
                  <p className="text-white text-opacity-80">{currDate}</p>
                </div>

                {/* Weather Icon and Temperature */}
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white border-opacity-30">
                      <img src={wIcons} alt="weather-icon" className="w-20 h-20 object-contain" />
                    </div>
                    <div className="text-6xl font-bold text-white mb-2">
                      {(weatherData.main.temp - 273.15).toFixed(1)}°C
                    </div>
                    <div className="text-2xl font-semibold text-white text-opacity-90 capitalize mb-2">
                      {weatherData.weather[0].description}
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-lg">
                      <span className="flex items-center text-red-200">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {(weatherData.main.temp_max - 273.15).toFixed(1)}°
                      </span>
                      <span className="flex items-center text-blue-200">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {(weatherData.main.temp_min - 273.15).toFixed(1)}°
                      </span>
                    </div>
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white border-opacity-20">
                    <div className="text-2xl mb-2">💨</div>
                    <div className="text-sm font-medium text-white text-opacity-80 mb-1">Wind Speed</div>
                    <div className="text-lg font-bold text-white">
                      {weatherData.wind.speed} m/s
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white border-opacity-20">
                    <div className="text-2xl mb-2">💧</div>
                    <div className="text-sm font-medium text-white text-opacity-80 mb-1">Humidity</div>
                    <div className="text-lg font-bold text-white">
                      {weatherData.main.humidity}%
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white border-opacity-20">
                    <div className="text-2xl mb-2">🌡️</div>
                    <div className="text-sm font-medium text-white text-opacity-80 mb-1">Pressure</div>
                    <div className="text-lg font-bold text-white">
                      {weatherData.main.pressure} hPa
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white border-opacity-20">
                    <div className="text-2xl mb-2">🌡️</div>
                    <div className="text-sm font-medium text-white text-opacity-80 mb-1">Feels Like</div>
                    <div className="text-lg font-bold text-white">
                      {(weatherData.main.feels_like - 273.15).toFixed(1)}°C
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white border-opacity-20">
                    <div className="text-2xl mb-2">👁️</div>
                    <div className="text-sm font-medium text-white text-opacity-80 mb-1">Visibility</div>
                    <div className="text-lg font-bold text-white">
                      {weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) + ' km' : 'N/A'}
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white border-opacity-20">
                    <div className="text-2xl mb-2">🌅</div>
                    <div className="text-sm font-medium text-white text-opacity-80 mb-1">Sunrise</div>
                    <div className="text-lg font-bold text-white">
                      {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Forecast Section */}
              <div className="flex justify-center">
                <ForeCast />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;

