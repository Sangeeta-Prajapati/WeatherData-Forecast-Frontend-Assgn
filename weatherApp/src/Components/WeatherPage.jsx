// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import CloudIcon from "../assets/icons/cloud.png";
// import rainIcon from "../assets/icons/rain.jpeg";
// import sunIcon from "../assets/icons/sun.jpeg";
// import clearBg from "../assets/images/Clear.jpg";
// import cloudBg from "../assets/images/Cloudy.jpg";
// import rainBg from "../assets/images/Rainy.jpg";
// import sunnyBg from "../assets/images/Sunny.jpg";
// import ForeCast from "./ForeCast";

// const WeatherPage = () => {
//   // "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

//   const { cityName } = useParams();
//   console.log("city name", cityName);

//   const [weatherData, setWeatherData] = useState(null);
//   const [wIcons, setWIcons] = useState(sunIcon);
//   const [weatherBg, setWeatherBg] = useState(sunnyBg);
//   const [currDate, setCurrDate] = useState("");

//   const APIKEY = import.meta.env.VITE_API_KEY;

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`
//         );
//         setWeatherData(res.data);
//       } catch (err) {
//         console.log("Fetching error weather", err);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   // console.log("state", weatherData);

//   useEffect(() => {
//     if (weatherData && weatherData.weather) {
//       const weatherIcon = weatherData.weather[0].main;
//       if (weatherIcon === "Clouds") {
//         setWIcons(CloudIcon);
//         setWeatherBg(cloudBg);
//       } else if (weatherIcon === "Rain") {
//         setWIcons(rainIcon);
//         setWeatherBg(rainBg);
//       } else if (weatherIcon === "Clear") {
//         setWIcons(sunIcon);
//         setWeatherBg(sunnyBg);
//       }
//     }
 
//     const date = new Date();
//     // console.log(date);
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     setCurrDate(date.toLocaleDateString("en-Us", options));
//   }, [weatherData]);

//   return (
//     <div>
//       <div>
//         {weatherData && (
//           <div
//             className="min-h-screen flex items-center justify-center gap-5 flex-col sm:flex-row xl:flex-col"
//             style={{
//               backgroundImage: `url(${weatherBg})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               borderColor: "1px solid red",
//             }}
//           >
//             <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs border-2">
//               <div className="font-bold text-xl">{cityName}</div>
//               <div className="text-sm text-gray-500">{currDate}</div>
//               <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
//                 <img src={wIcons} alt="cloud-icon" />
//               </div>
//               <div className="flex flex-row items-center justify-center mt-6">
//                 <div className="font-medium text-6xl">
//                   {(weatherData.main.temp - 273.15).toFixed(1)}°C
//                 </div>
//                 <div className="flex flex-col items-center ml-6">
//                   <div>{weatherData.weather[0].main}</div>
//                   <div className="mt-1">
//                     <span className="text-sm">
//                       <i className="far fa-long-arrow-up" />
//                     </span>
//                     <span className="text-sm font-light text-gray-500">
//                       {(weatherData.main.temp_max - 273.15).toFixed(1)}°C
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-sm">
//                       <i className="far fa-long-arrow-down" />
//                     </span>
//                     <span className="text-sm font-light text-gray-500">
//                       {(weatherData.main.temp_min - 273.15).toFixed(1)}°C
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-row justify-between mt-6">
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm">Wind</div>
//                   <div className="text-sm text-gray-500">
//                     {weatherData.wind.speed} m/s
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm">Humidity</div>
//                   <div className="text-sm text-gray-500">
//                     {weatherData.main.humidity}%
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm">Pressure</div>
//                   <div className="text-sm text-gray-500">
//                     {weatherData.main.pressure} hPa
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <ForeCast />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeatherPage;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import CloudIcon from "../assets/icons/cloud.png";
// import rainIcon from "../assets/icons/rain.jpeg";
// import sunIcon from "../assets/icons/sun.jpeg";
// import clearBg from "../assets/images/Clear.jpg";
// import cloudBg from "../assets/images/Cloudy.jpg";
// import rainBg from "../assets/images/Rainy.jpg";
// import sunnyBg from "../assets/images/Sunny.jpg";
// import ForeCast from "./ForeCast";

// const WeatherPage = () => {
//   const { cityName } = useParams();
//   console.log("city name", cityName);

//   const [weatherData, setWeatherData] = useState(null);
//   const [wIcons, setWIcons] = useState(sunIcon);
//   const [weatherBg, setWeatherBg] = useState(sunnyBg);
//   const [currDate, setCurrDate] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const APIKEY = import.meta.env.VITE_API_KEY;

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Use the cityName as is (it might include country code)
//         const res = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`
//         );
//         setWeatherData(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.log("Fetching error weather", err);
//         if (err.response && err.response.status === 404) {
//           setError("City not found. Please check the city name and try again.");
//         } else {
//           setError("Failed to fetch weather data. Please try again.");
//         }
//         setLoading(false);
//       }
//     };

//     if (cityName) {
//       fetchWeatherData();
//     }
//   }, [cityName, APIKEY]);

//   useEffect(() => {
//     if (weatherData && weatherData.weather) {
//       const weatherIcon = weatherData.weather[0].main;
//       if (weatherIcon === "Clouds") {
//         setWIcons(CloudIcon);
//         setWeatherBg(cloudBg);
//       } else if (weatherIcon === "Rain") {
//         setWIcons(rainIcon);
//         setWeatherBg(rainBg);
//       } else if (weatherIcon === "Clear") {
//         setWIcons(sunIcon);
//         setWeatherBg(sunnyBg);
//       } else {
//         setWIcons(sunIcon);
//         setWeatherBg(clearBg);
//       }
//     }
 
//     const date = new Date();
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     setCurrDate(date.toLocaleDateString("en-Us", options));
//   }, [weatherData]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
//         <div className="text-center">
//           <div className="text-3xl font-bold text-white mb-4">Loading weather data...</div>
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
//         <div className="text-center bg-white p-8 rounded-lg shadow-lg">
//           <div className="text-2xl font-bold text-red-600 mb-4">{error}</div>
//           <Link 
//             to="/" 
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Back to Search
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div>
//         {weatherData && (
//           <div
//             className="min-h-screen flex items-center justify-center gap-5 flex-col sm:flex-row xl:flex-col"
//             style={{
//               backgroundImage: `url(${weatherBg})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             {/* Back to search button */}
//             <div className="absolute top-4 left-4">
//               <Link 
//                 to="/" 
//                 className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 font-bold py-2 px-4 rounded shadow-lg transition-all"
//               >
//                 ← Back to Search
//               </Link>
//             </div>

//             <div className="flex flex-col bg-white bg-opacity-90 rounded-lg p-6 w-full max-w-xs border-2 shadow-lg">
//               <div className="font-bold text-2xl text-center">
//                 {weatherData.name}
//               </div>
//               <div className="text-lg text-center text-gray-600">
//                 {weatherData.sys.country}
//               </div>
//               <div className="text-sm text-gray-500 text-center mb-4">{currDate}</div>
              
//               <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
//                 <img src={wIcons} alt="weather-icon" className="w-full h-full object-contain" />
//               </div>
              
//               <div className="flex flex-row items-center justify-center mt-6">
//                 <div className="font-medium text-5xl text-gray-800">
//                   {(weatherData.main.temp - 273.15).toFixed(1)}°C
//                 </div>
//                 <div className="flex flex-col items-center ml-6">
//                   <div className="font-semibold text-lg">{weatherData.weather[0].main}</div>
//                   <div className="text-sm text-gray-600 capitalize">{weatherData.weather[0].description}</div>
//                   <div className="mt-2">
//                     <div className="text-sm">
//                       <span className="text-red-500">↑ </span>
//                       <span className="font-medium">
//                         {(weatherData.main.temp_max - 273.15).toFixed(1)}°C
//                       </span>
//                     </div>
//                     <div className="text-sm">
//                       <span className="text-blue-500">↓ </span>
//                       <span className="font-medium">
//                         {(weatherData.main.temp_min - 273.15).toFixed(1)}°C
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-row justify-between mt-6 pt-4 border-t border-gray-200">
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm text-gray-600">Wind</div>
//                   <div className="text-sm font-semibold">
//                     {weatherData.wind.speed} m/s
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm text-gray-600">Humidity</div>
//                   <div className="text-sm font-semibold">
//                     {weatherData.main.humidity}%
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm text-gray-600">Pressure</div>
//                   <div className="text-sm font-semibold">
//                     {weatherData.main.pressure} hPa
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex flex-row justify-between mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm text-gray-600">Feels Like</div>
//                   <div className="text-sm font-semibold">
//                     {(weatherData.main.feels_like - 273.15).toFixed(1)}°C
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm text-gray-600">Visibility</div>
//                   <div className="text-sm font-semibold">
//                     {weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) + ' km' : 'N/A'}
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div className="font-medium text-sm text-gray-600">UV Index</div>
//                   <div className="text-sm font-semibold">
//                     N/A
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <ForeCast />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeatherPage;




import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CloudIcon from "../assets/icons/cloud.png";
import rainIcon from "../assets/icons/rain.jpeg";
import sunIcon from "../assets/icons/sun.jpeg";
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
              <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
                {/* Location and Date */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {weatherData.name}
                  </h1>
                  <p className="text-xl text-gray-600 mb-1">
                    {weatherData.sys.country}
                  </p>
                  <p className="text-gray-500">{currDate}</p>
                </div>

                {/* Weather Icon and Temperature */}
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
                      <img src={wIcons} alt="weather-icon" className="w-20 h-20 object-contain" />
                    </div>
                    <div className="text-6xl font-bold text-gray-800 mb-2">
                      {(weatherData.main.temp - 273.15).toFixed(1)}°C
                    </div>
                    <div className="text-2xl font-semibold text-gray-700 capitalize mb-2">
                      {weatherData.weather[0].description}
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-lg">
                      <span className="flex items-center text-red-500">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {(weatherData.main.temp_max - 273.15).toFixed(1)}°
                      </span>
                      <span className="flex items-center text-blue-500">
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
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-2">💨</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Wind Speed</div>
                    <div className="text-lg font-bold text-gray-800">
                      {weatherData.wind.speed} m/s
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-2">💧</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Humidity</div>
                    <div className="text-lg font-bold text-gray-800">
                      {weatherData.main.humidity}%
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-2">🌡️</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Pressure</div>
                    <div className="text-lg font-bold text-gray-800">
                      {weatherData.main.pressure} hPa
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-2">🌡️</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Feels Like</div>
                    <div className="text-lg font-bold text-gray-800">
                      {(weatherData.main.feels_like - 273.15).toFixed(1)}°C
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-2">👁️</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Visibility</div>
                    <div className="text-lg font-bold text-gray-800">
                      {weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) + ' km' : 'N/A'}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-2">🌅</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Sunrise</div>
                    <div className="text-lg font-bold text-gray-800">
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
