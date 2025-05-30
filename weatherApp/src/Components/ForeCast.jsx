import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CloudIcon from "../assets/icons/cloud.png";
import rainIcon from "../assets/icons/rain.png";
import sunIcon from "../assets/icons/sun.png";

const ForeCast = () => {
  const [foreCastData, setForCastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cityName } = useParams();
  const APIKEY = import.meta.env.VITE_API_KEY;
 
  useEffect(() => {
    const fetchForeCastData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`
        );
        
        const dailyForecasts = res.data.list.filter(
          (item, index) => index % 8 === 0
        );
        
        setForCastData(dailyForecasts);
        setLoading(false);
      } catch (err) {
        console.log("Fetching error forecast", err);
        setError("Failed to fetch forecast data");
        setLoading(false);
      }
    };

    if (cityName) {
      fetchForeCastData();
    }
  }, [cityName, APIKEY]);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clouds":
        return CloudIcon;
      case "Rain":
        return rainIcon;
      case "Clear":
        return sunIcon;
      case "Snow":
        return CloudIcon;
      case "Thunderstorm":
        return rainIcon;
      case "Drizzle":
        return rainIcon;
      case "Mist":
      case "Fog":
      case "Haze":
        return CloudIcon;
      default:
        return sunIcon;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDayName = (dateString, index) => {
    if (index === 0) return "Today";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  if (loading) {
    return (
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-30 w-full max-w-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h2>
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
            <span className="text-white font-medium">Loading forecast...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-30 w-full max-w-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h2>
          <div className="text-red-200 font-medium">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-30 w-full max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">5-Day Forecast</h2>
        <p className="text-white text-opacity-90">Weather outlook for the coming days</p>
      </div>
      
      {foreCastData.length > 0 ? (
        <div className="space-y-4">
          {foreCastData.map((day, index) => {
            const weatherIcon = getWeatherIcon(day.weather[0].main);
            const dayName = getDayName(day.dt_txt, index);

            return (
              <div
                key={index}
                className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-200 hover:shadow-lg backdrop-blur-md border border-white border-opacity-20 ${
                  index === 0 
                    ? 'bg-white bg-opacity-30 border-opacity-40 shadow-lg' 
                    : 'bg-white bg-opacity-15 hover:bg-opacity-25'
                }`}
              >
                {/* Day and Date */}
                <div className="flex-1">
                  <div className="font-bold text-lg text-white">
                    {dayName}
                  </div>
                  <div className="text-sm text-white text-opacity-80">
                    {formatDate(day.dt_txt)}
                  </div>
                </div>

                {/* Weather Icon and Description */}
                <div className="flex items-center space-x-4 flex-1 justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white border-opacity-20">
                    <img 
                      src={weatherIcon} 
                      alt={day.weather[0].description} 
                      className="w-12 h-12 object-contain" 
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-white capitalize">
                      {day.weather[0].description}
                    </div>
                    <div className="text-sm text-white text-opacity-80">
                      💧 {(day.pop * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Temperature */}
                <div className="flex-1 text-right">
                  <div className="text-2xl font-bold text-white mb-1">
                    {(day.main.temp - 273.15).toFixed(0)}°C
                  </div>
                  <div className="flex justify-end space-x-2 text-sm">
                    <span className="text-red-200 font-medium">
                      H: {(day.main.temp_max - 273.15).toFixed(0)}°
                    </span>
                    <span className="text-blue-200 font-medium">
                      L: {(day.main.temp_min - 273.15).toFixed(0)}°
                    </span>
                  </div>
                  <div className="text-xs text-white text-opacity-70 mt-1">
                    💨 {day.wind.speed.toFixed(1)} m/s
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-white text-opacity-80 text-lg">
            <div className="text-4xl mb-4">📅</div>
            <p>No forecast data available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForeCast;
