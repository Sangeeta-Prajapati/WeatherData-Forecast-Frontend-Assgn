// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import CloudIcon from "../assets/icons/cloud.png";
// import rainIcon from "../assets/icons/rain.jpeg";
// import sunIcon from "../assets/icons/sun.jpeg";

// const ForeCast = () => {
//   const [foreCastData, setForCastData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // const [wIforeCastIcon, setWIforeCastIcon] = useState(sunIcon);

//   const { cityName } = useParams();
//   const APIKEY = import.meta.env.VITE_API_KEY;
 
//   useEffect(() => {
//     const fetchForeCastData = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`
//         );
//         const dailyForecasts = res.data.list.filter(
//           (item, index) => index % 8 === 0
//         );
//         setForCastData(dailyForecasts);
//         setLoading(false);
//         console.log(dailyForecasts);
//       } catch (err) {
//         console.log("Fetching error weather", err);
//         setLoading(false);
//       }
//     };

//     fetchForeCastData();
//   }, [cityName]);

//   {
//     /* // for icons to show


//   useEffect(() => {
//     if (foreCastData && foreCastData.weather) {
//       const weatherIcon = foreCastData.weather[0].main;
//       if (weatherIcon === "Clouds") {
//         setWIforeCastIcon(CloudIcon);
//       } else if (weatherIcon === "Rain") {
//         setWIforeCastIcon(rainIcon);
//       } else if (weatherIcon === "Clear") {
//         setWIforeCastIcon(sunIcon);
//       }
//     }

//     {
//       /*  const date = new Date();
//     // console.log(date);
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     setCurrDate(date.toLocaleDateString("en-Us", options));  
    
// },  [foreCastData]);  */
//   }

//   return (
//     <div className="p-2">
//       <h1 className="text-center text-grey font-semibold">Forecast</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="flex xl:gap-5 flex-col xl:flex-row">
//           {foreCastData.map((day, index) => {
//             let weatherIcon;
//             if (day.weather[0].main === "Clouds") {
//               weatherIcon = CloudIcon;
//             } else if (day.weather[0].main === "Rain") {
//               weatherIcon = rainIcon;
//             } else if (day.weather[0].main === "Clear") {
//               weatherIcon = sunIcon;
//             }

//             //  extract date for next days

//             const date = new Date(day.dt_txt);
//             const foreCastDate = date.toLocaleDateString("en-Us", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             });

//             return (
//               <div
//                 key={index}
//                 className="flex flex-col xl:gap-2 items-center text-white p-5 xl:flex-row"
//               >
//                 <p className="font-semibold">{foreCastDate}</p>
//                 <img src={weatherIcon} alt="cloud-image" className="w-[40px]" />

//                 <p className="font-normal">
//                   Max Temp: {(day.main.temp_max - 273.15).toFixed(2)} °C
//                 </p>
//                 <p className="font-normal">
//                   Min Temp: {(day.main.temp_min - 273.15).toFixed(2)} °C
//                 </p>
//                 <p className="font-normal">{day.weather[0].description}</p>
//                 <p className="font-normal">{(day.pop * 100).toFixed(2)}%</p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForeCast;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import CloudIcon from "../assets/icons/cloud.png";
// import rainIcon from "../assets/icons/rain.jpeg";
// import sunIcon from "../assets/icons/sun.jpeg";

// const ForeCast = () => {
//   const [foreCastData, setForCastData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { cityName } = useParams();
//   const APIKEY = import.meta.env.VITE_API_KEY;
 
//   useEffect(() => {
//     const fetchForeCastData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const res = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`
//         );
        
//         // Get daily forecasts (every 8th item represents roughly 24 hours later)
//         const dailyForecasts = res.data.list.filter(
//           (item, index) => index % 8 === 0
//         );
        
//         setForCastData(dailyForecasts);
//         setLoading(false);
//         console.log("Forecast data:", dailyForecasts);
//       } catch (err) {
//         console.log("Fetching error forecast", err);
//         setError("Failed to fetch forecast data");
//         setLoading(false);
//       }
//     };

//     if (cityName) {
//       fetchForeCastData();
//     }
//   }, [cityName, APIKEY]);

//   const getWeatherIcon = (weatherMain) => {
//     switch (weatherMain) {
//       case "Clouds":
//         return CloudIcon;
//       case "Rain":
//         return rainIcon;
//       case "Clear":
//         return sunIcon;
//       case "Snow":
//         return CloudIcon; // You can add a snow icon
//       case "Thunderstorm":
//         return rainIcon;
//       case "Drizzle":
//         return rainIcon;
//       case "Mist":
//       case "Fog":
//       case "Haze":
//         return CloudIcon;
//       default:
//         return sunIcon;
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
//         <h1 className="text-center text-xl font-semibold mb-4">5-Day Forecast</h1>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-2 text-gray-600">Loading forecast...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
//         <h1 className="text-center text-xl font-semibold mb-4">5-Day Forecast</h1>
//         <p className="text-center text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg w-full max-w-4xl">
//       <h1 className="text-center text-xl font-semibold mb-6 text-gray-800">5-Day Weather Forecast</h1>
      
//       {foreCastData.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//           {foreCastData.map((day, index) => {
//             const weatherIcon = getWeatherIcon(day.weather[0].main);
//             const forecastDate = formatDate(day.dt_txt);

//             return (
//               <div
//                 key={index}
//                 className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
//               >
//                 <p className="font-semibold text-sm text-gray-700 mb-2 text-center">
//                   {index === 0 ? "Today" : forecastDate}
//                 </p>
                
//                 <img 
//                   src={weatherIcon} 
//                   alt={day.weather[0].description} 
//                   className="w-12 h-12 mb-2" 
//                 />

//                 <div className="text-center mb-2">
//                   <p className="font-bold text-lg text-gray-800">
//                     {(day.main.temp - 273.15).toFixed(0)}°C
//                   </p>
//                   <div className="flex justify-between text-xs text-gray-600 w-full">
//                     <span>H: {(day.main.temp_max - 273.15).toFixed(0)}°</span>
//                     <span>L: {(day.main.temp_min - 273.15).toFixed(0)}°</span>
//                   </div>
//                 </div>

//                 <p className="text-xs text-gray-600 text-center capitalize mb-1">
//                   {day.weather[0].description}
//                 </p>
                
//                 <div className="text-xs text-gray-500 text-center">
//                   <p>💧 {(day.pop * 100).toFixed(0)}%</p>
//                   <p>💨 {day.wind.speed.toFixed(1)} m/s</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="text-center text-gray-600">No forecast data available</p>
//       )}
//     </div>
//   );
// };

// export default ForeCast;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CloudIcon from "../assets/icons/cloud.png";
import rainIcon from "../assets/icons/rain.jpeg";
import sunIcon from "../assets/icons/sun.jpeg";

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
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20 w-full max-w-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h2>
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-gray-600 font-medium">Loading forecast...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20 w-full max-w-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
          <div className="text-red-500 font-medium">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20 w-full max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">5-Day Forecast</h2>
        <p className="text-gray-600">Weather outlook for the coming days</p>
      </div>
      
      {foreCastData.length > 0 ? (
        <div className="space-y-4">
          {foreCastData.map((day, index) => {
            const weatherIcon = getWeatherIcon(day.weather[0].main);
            const dayName = getDayName(day.dt_txt, index);

            return (
              <div
                key={index}
                className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                  index === 0 
                    ? 'bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300' 
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100'
                }`}
              >
                {/* Day and Date */}
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800">
                    {dayName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(day.dt_txt)}
                  </div>
                </div>

                {/* Weather Icon and Description */}
                <div className="flex items-center space-x-4 flex-1 justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <img 
                      src={weatherIcon} 
                      alt={day.weather[0].description} 
                      className="w-12 h-12 object-contain" 
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-800 capitalize">
                      {day.weather[0].description}
                    </div>
                    <div className="text-sm text-gray-600">
                      💧 {(day.pop * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Temperature */}
                <div className="flex-1 text-right">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {(day.main.temp - 273.15).toFixed(0)}°C
                  </div>
                  <div className="flex justify-end space-x-2 text-sm">
                    <span className="text-red-500 font-medium">
                      H: {(day.main.temp_max - 273.15).toFixed(0)}°
                    </span>
                    <span className="text-blue-500 font-medium">
                      L: {(day.main.temp_min - 273.15).toFixed(0)}°
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    💨 {day.wind.speed.toFixed(1)} m/s
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">
            <div className="text-4xl mb-4">📅</div>
            <p>No forecast data available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForeCast;
