// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const CitiesTable = () => {
//   const [cities, setCities] = useState([]);
//   const [searchCity, searchSetCity] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const APIKEY = import.meta.env.VITE_API_KEY;

//   // Check if API key is available
//   useEffect(() => {
//     if (!APIKEY) {
//       setError("API key is missing. Please add VITE_API_KEY to your .env file");
//     }
//   }, [APIKEY]);

//   // Function to search cities using OpenWeatherMap Geocoding API
//   const searchCities = async (query) => {
//     if (!query || query.length < 2) {
//       setCities([]);
//       return;
//     }

//     if (!APIKEY) {
//       setError("API key is missing. Please add VITE_API_KEY to your .env file");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       const res = await axios.get(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=20&appid=${APIKEY}`
//       );
      
//       const transformedCities = res.data.map((city, index) => ({
//         id: index,
//         name: city.name,
//         cou_name_en: city.country,
//         state: city.state || '',
//         lat: city.lat,
//         lon: city.lon,
//         timezone: 'N/A'
//       }));
      
//       setCities(transformedCities);
//       setLoading(false);
//     } catch (err) {
//       console.log("Error searching cities", err);
//       if (err.response && err.response.status === 401) {
//         setError("Invalid API key. Please check your OpenWeatherMap API key in .env file");
//       } else if (err.response && err.response.status === 429) {
//         setError("API rate limit exceeded. Please try again later.");
//       } else {
//         setError("Failed to search cities. Please try again.");
//       }
//       setLoading(false);
//     }
//   };

//   // Debounce search to avoid too many API calls
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (APIKEY) {
//         searchCities(searchCity);
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [searchCity, APIKEY]);

//   const handleSearchCity = (e) => {
//     searchSetCity(e.target.value);
//   };

//   const handleRightClick = (e, cityName, country) => {
//     if (e.button === 2) {
//       window.open(`/weather/${cityName},${country}`, "_blank");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
//             🌤️ Weather Explorer
//           </h1>
//           <p className="text-xl text-center text-blue-100">
//             Discover weather conditions worldwide
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8 ">
//         <div className="max-w-6xl mx-auto">
//           {/* Search Section */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
//             <div className="text-center mb-6">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 ">
//                 Search Cities Worldwide
//               </h2>
//               <p className="text-gray-600">
//                 Type any city name to explore its weather conditions
//               </p>
//             </div>

//             {/* Search Input */}
//             <div className="relative max-w-2xl mx-auto mb-6">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <input
//                 className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none"
//                 placeholder="Search cities... (e.g., Mumbai, London, New York, Tokyo)"
//                 onChange={handleSearchCity}
//                 value={searchCity}
//                 disabled={!APIKEY}
//               />
//             </div>

//             {/* Status Messages */}
//             {!APIKEY && (
//               <div className="max-w-2xl mx-auto mb-6">
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                       <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <h3 className="text-sm font-medium text-red-800">API Key Missing!</h3>
//                       <p className="text-sm text-red-700 mt-1">
//                         Please create a .env file with VITE_API_KEY=your_openweathermap_api_key
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {loading && (
//               <div className="text-center py-8">
//                 <div className="inline-flex items-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
//                   <span className="text-lg font-medium text-blue-600">Searching cities...</span>
//                 </div>
//               </div>
//             )}

//             {error && (
//               <div className="max-w-2xl mx-auto mb-6">
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//                   <p className="text-red-700 font-medium text-center">{error}</p>
//                 </div>
//               </div>
//             )}

//             {!loading && !error && searchCity && cities.length === 0 && APIKEY && (
//               <div className="text-center py-8">
//                 <div className="text-gray-500 text-lg">
//                   <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
//                   </svg>
//                   <p>No cities found. Try a different search term.</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Results Table */}
//           {cities.length > 0 && (
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
//                 <h3 className="text-xl font-bold text-gray-800">Search Results</h3>
//                 <p className="text-gray-600">Click on any city to view its weather</p>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         City
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         State/Region
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Country
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Coordinates
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {cities.map((city, i) => (
//                       <tr
//                         key={`${city.name}-${city.cou_name_en}-${i}`}
//                         className="hover:bg-blue-50 transition-colors duration-200"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <Link
//                             to={`/weather/${city.name},${city.cou_name_en}`}
//                             className="text-blue-600 hover:text-blue-800 font-medium text-lg hover:underline transition-colors duration-200"
//                             onContextMenu={(e) => handleRightClick(e, city.name, city.cou_name_en)}
//                           >
//                             🏙️ {city.name}
//                           </Link>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                           {city.state || 'N/A'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                             {city.cou_name_en}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono text-sm">
//                           {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Welcome Message */}
//           {!searchCity && APIKEY && (
//             <div className="text-center py-16">
//               <div className="max-w-2xl mx-auto">
//                 <div className="text-6xl mb-6">🌍</div>
//                 <h3 className="text-3xl font-bold text-gray-800 mb-4">
//                   Explore Weather Worldwide
//                 </h3>
//                 <p className="text-xl text-gray-600 mb-8">
//                   Start typing a city name to discover weather conditions from around the globe
//                 </p>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                   <div className="bg-white rounded-xl p-4 shadow-md">
//                     <div className="text-2xl mb-2">🇮🇳</div>
//                     <p className="text-sm font-medium text-gray-700">India</p>
//                   </div>
//                   <div className="bg-white rounded-xl p-4 shadow-md">
//                     <div className="text-2xl mb-2">🇺🇸</div>
//                     <p className="text-sm font-medium text-gray-700">USA</p>
//                   </div>
//                   <div className="bg-white rounded-xl p-4 shadow-md">
//                     <div className="text-2xl mb-2">🇬🇧</div>
//                     <p className="text-sm font-medium text-gray-700">UK</p>
//                   </div>
//                   <div className="bg-white rounded-xl p-4 shadow-md">
//                     <div className="text-2xl mb-2">🇯🇵</div>
//                     <p className="text-sm font-medium text-gray-700">Japan</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CitiesTable;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [searchCity, searchSetCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const APIKEY = import.meta.env.VITE_API_KEY;

  // Check if API key is available
  useEffect(() => {
    if (!APIKEY) {
      setError("API key is missing. Please add VITE_API_KEY to your .env file");
    }
  }, [APIKEY]);

  // Function to search cities using OpenWeatherMap Geocoding API
  const searchCities = async (query) => {
    if (!query || query.length < 2) {
      setCities([]);
      return;
    }

    if (!APIKEY) {
      setError("API key is missing. Please add VITE_API_KEY to your .env file");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=20&appid=${APIKEY}`
      );
      
      const transformedCities = res.data.map((city, index) => ({
        id: index,
        name: city.name,
        cou_name_en: city.country,
        state: city.state || '',
        lat: city.lat,
        lon: city.lon,
        timezone: 'N/A'
      }));
      
      setCities(transformedCities);
      setLoading(false);
    } catch (err) {
      console.log("Error searching cities", err);
      if (err.response && err.response.status === 401) {
        setError("Invalid API key. Please check your OpenWeatherMap API key in .env file");
      } else if (err.response && err.response.status === 429) {
        setError("API rate limit exceeded. Please try again later.");
      } else {
        setError("Failed to search cities. Please try again.");
      }
      setLoading(false);
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (APIKEY) {
        searchCities(searchCity);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchCity, APIKEY]);

  const handleSearchCity = (e) => {
    searchSetCity(e.target.value);
  };

  const handleRightClick = (e, cityName, country) => {
    if (e.button === 2) {
      window.open(`/weather/${cityName},${country}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="text-center py-16 px-4">
          <div className="animate-fade-in-down">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              🌤️ Weather Explorer
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-2 font-light">
              Discover weather conditions worldwide
            </p>
            <p className="text-lg text-blue-300 opacity-80">
              Search any city and explore real-time weather data
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white border-opacity-20 shadow-2xl animate-fade-in-up">
            
            {/* Search Input Container */}
            <div className="relative max-w-3xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-white text-opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="w-full pl-16 pr-6 py-6 text-xl bg-white bg-opacity-20 backdrop-blur-md border-2 border-white border-opacity-30 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30 transition-all duration-300 outline-none text-white placeholder-white placeholder-opacity-70 font-medium"
                placeholder="Search cities worldwide... (e.g., Mumbai, London, New York, Tokyo)"
                onChange={handleSearchCity}
                value={searchCity}
                disabled={!APIKEY}
              />
              {searchCity && (
                <button
                  onClick={() => searchSetCity("")}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-white text-opacity-60 hover:text-opacity-100 transition-all duration-200"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Status Messages */}
            {!APIKEY && (
              <div className="max-w-3xl mx-auto mb-6 animate-shake">
                <div className="bg-red-500 bg-opacity-20 backdrop-blur-md border border-red-400 border-opacity-50 rounded-2xl p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-red-200">⚠️ API Key Missing!</h3>
                      <p className="text-red-300 mt-1">
                        Please create a .env file with VITE_API_KEY=your_openweathermap_api_key
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="text-center py-8 animate-pulse">
                <div className="inline-flex items-center space-x-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-400 border-t-transparent"></div>
                  <span className="text-xl font-medium text-blue-200">Searching cities...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="max-w-3xl mx-auto mb-6 animate-shake">
                <div className="bg-red-500 bg-opacity-20 backdrop-blur-md border border-red-400 border-opacity-50 rounded-2xl p-6">
                  <p className="text-red-200 font-medium text-center text-lg">{error}</p>
                </div>
              </div>
            )}

            {!loading && !error && searchCity && cities.length === 0 && APIKEY && (
              <div className="text-center py-8 animate-fade-in">
                <div className="text-white text-opacity-70 text-xl">
                  <div className="text-6xl mb-4">🔍</div>
                  <p>No cities found. Try a different search term.</p>
                </div>
              </div>
            )}
          </div>

          {/* Results Table */}
          {cities.length > 0 && (
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white border-opacity-20 shadow-2xl animate-fade-in-up animation-delay-200">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-opacity-50 backdrop-blur-md px-8 py-6 border-b border-white border-opacity-20">
                <h3 className="text-2xl font-bold text-white mb-2">🌍 Search Results</h3>
                <p className="text-blue-200">Click on any city to view its weather • Right-click to open in new tab</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-white bg-opacity-5">
                    <tr>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                        🏙️ City
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                        📍 State/Region
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                        🌍 Country
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                        🗺️ Coordinates
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white divide-opacity-10">
                    {cities.map((city, i) => (
                      <tr
                        key={`${city.name}-${city.cou_name_en}-${i}`}
                        className="hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up group"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <td className="px-8 py-6 whitespace-nowrap">
                          <Link
                            to={`/weather/${city.name},${city.cou_name_en}`}
                            className="text-blue-300 hover:text-blue-100 font-bold text-lg transition-all duration-300 transform group-hover:scale-105 inline-flex items-center space-x-2"
                            onContextMenu={(e) => handleRightClick(e, city.name, city.cou_name_en)}
                          >
                            <span>{city.name}</span>
                            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </Link>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-white text-opacity-80 font-medium">
                          {city.state || 'N/A'}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                            {city.cou_name_en}
                          </span>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-blue-200 font-mono text-sm">
                          {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

                    {/* Welcome Message */}
          {!searchCity && APIKEY && (
            <div className="text-center py-16 animate-fade-in">
              <div className="max-w-4xl mx-auto">
                <div className="text-8xl mb-8 animate-bounce">🌍</div>
                <h3 className="text-4xl font-bold text-white mb-6">
                  Explore Weather Worldwide
                </h3>
                <p className="text-xl text-blue-200 mb-12 leading-relaxed">
                  Start typing a city name to discover weather conditions from around the globe.<br />
                  Get real-time data, forecasts, and detailed weather information instantly.
                </p>
                
                {/* Popular Countries Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  {[
                    { flag: "🇮🇳", country: "India", cities: "Mumbai, Delhi, Bangalore" },
                    { flag: "🇺🇸", country: "USA", cities: "New York, Los Angeles" },
                    { flag: "🇬🇧", country: "UK", cities: "London, Manchester" },
                    { flag: "🇯🇵", country: "Japan", cities: "Tokyo, Osaka" }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-xl animate-fade-in-up"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="text-4xl mb-3">{item.flag}</div>
                      <p className="text-lg font-bold text-white mb-2">{item.country}</p>
                      <p className="text-sm text-blue-200 opacity-80">{item.cities}</p>
                    </div>
                  ))}
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: "🌡️",
                      title: "Real-time Weather",
                      description: "Get current temperature, humidity, and conditions"
                    },
                    {
                      icon: "📅",
                      title: "5-Day Forecast",
                      description: "Plan ahead with detailed weather predictions"
                    },
                    {
                      icon: "🌍",
                      title: "Global Coverage",
                      description: "Search cities from every corner of the world"
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                      style={{ animationDelay: `${600 + index * 200}ms` }}
                    >
                      <div className="text-5xl mb-4">{feature.icon}</div>
                      <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                      <p className="text-blue-200 opacity-80">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 animate-fade-in-up animation-delay-1000">
                  <p className="text-lg text-blue-300 mb-6">
                    ✨ Ready to explore? Start by typing any city name above!
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-blue-400">
                    <span>💡 Tip: Try "Mumbai", "London", or "Tokyo"</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitiesTable;
