// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { Link } from "react-router-dom";

// const CitiesTable = () => {
//   const [cities, setCities] = useState([]);
//   const [searchCity, searchSetCity] = useState("");
//   const [filterCities, setFilterCities] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [currPage, setCurrPage] = useState(1);

//   useEffect(() => {
//     getCitiesData();
//   }, []);

//   const getCitiesData = () => {
//     setTimeout(async () => {
//       try {
//         const res = await axios.get(
//           `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${
//             (currPage - 1) * 10
//           }`
//         );
//         const newCities = res.data.results;
//         setCities((prevCities) => [...prevCities, ...newCities]);

//         // check if there is more data to load
//         setCurrPage((prevPage) => prevPage + 1);
//         if (newCities.length === 0) {
//           setHasMore(false);
//         }
//       } catch (err) {
//         console.log("Error found", err);
//       }
//     }, 1000);
//   };

//   const handleSearchCity = (e) => {
//     searchSetCity(e.target.value);
//   };
//    console.log("city name", searchCity);

//    console.log("state", cities);

//   useEffect(() => {
//     const filterCity = cities.filter((city) =>
//       city.name.toLowerCase().includes(searchCity.toLowerCase())
//     );

//     setFilterCities(filterCity);
//   }, [cities, searchCity]);

//   console.log("filter state", filterCities);

//   const handleRightClick = (e, cityName) => {
//     if (e.button == 2) {
//       window.open(`/weather/${cityName}`, "_blank");
//     }
//   };

//   return (
//     <>
//       <div
//         className="container mx-auto mt-20"
//         style={{
//           backgroundColor: "#ecd9df",
//           border: " 1.5px solid black",
//           borderRadius: "5px",
//         }}
//       >
//         <h2 className="text-center text-3xl font-bold mb-6 mt-4">
//           Cities Table
//         </h2>
//         <input
//           className="border-2 border-black px-3 py-3 rounded-lg w-[50%] mb-5 ml-5"
//           placeholder="Search City...."
//           onChange={handleSearchCity}
//           value={searchCity}
//         />
//         <div className="flex flex-col">
//           <div className="-m-1.5 overflow-x-auto">
//             <div className="p-1.5 min-w-full inline-block align-middle">
//               <div className="overflow-hidden">
//                 <InfiniteScroll
//                   dataLength={cities.length}
//                   next={getCitiesData}
//                   hasMore={hasMore}
//                   loader={
//                     <h4 className="text-center font-bold pt-5">Loading...</h4>
//                   }
//                   endMessage={
//                     <p style={{ textAlign: "center" }}>
//                       <b>No more data to load</b>
//                     </p>
//                   }
//                 >
//                   <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
//                     <thead>
//                       <tr>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
//                         >
//                           City
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
//                         >
//                           Country
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
//                         >
//                           Timezone
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
//                       {filterCities.map((city, i) => (
//                         <tr
//                           className="hover:bg-gray-100 dark:hover:bg-neutral-700"
//                           key={i}
//                         >
//                           <td
//                             className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 cursor-pointer"
//                             onContextMenu={(e) =>
//                               handleRightClick(e, city.name)
//                             }
//                           >
//                             <Link to={`/weather/${city.name}`}>
//                               {city.name}
//                             </Link>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
//                             {city.cou_name_en}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
//                             {city.timezone}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </InfiniteScroll>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       ;
//     </>
//   );
// };

// export default CitiesTable;



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

//       console.log("Searching for:", query);
//       console.log(
//         "Using API key:",
//         APIKEY ? "API key loaded" : "API key missing"
//       );

//       // Using OpenWeatherMap Geocoding API to search cities
//       const res = await axios.get(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=20&appid=${APIKEY}`
//       );

//       // Transform the data to match our table structure
//       const transformedCities = res.data.map((city, index) => ({
//         id: index,
//         name: city.name,
//         cou_name_en: city.country,
//         state: city.state || "",
//         lat: city.lat,
//         lon: city.lon,
//         timezone: "N/A", // Geocoding API doesn't provide timezone
//       }));

//       setCities(transformedCities);
//       setLoading(false);
//     } catch (err) {
//       console.log("Error searching cities", err);

//       if (err.response && err.response.status === 401) {
//         setError(
//           "Invalid API key. Please check your OpenWeatherMap API key in .env file"
//         );
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
//     }, 500); // Wait 500ms after user stops typing

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
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg">
//           <div className="container mx-auto px-4">
//             <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
//               🌤️ Weather Explorer
//             </h1>
//             <p className="text-xl text-center text-blue-100">
//               Discover weather conditions worldwide
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* Main Content */}
//       <div
//         className="container mx-auto mt-20"
//         style={{
//           backgroundColor: "#ecd9df",
//           border: " 1.5px solid black",
//           borderRadius: "5px",
//         }}
//       >
//         <h2 className="text-center text-3xl font-bold mb-6 mt-4">
//           Cities Weather Search
//         </h2>
//         <div className="px-5">
//           <input
//             className="border-2 border-black px-3 py-3 rounded-lg w-full mb-5"
//             placeholder="Search any city worldwide... (e.g., Mumbai, London, New York, Tokyo)"
//             onChange={handleSearchCity}
//             value={searchCity}
//             disabled={!APIKEY}
//           />

//           {!APIKEY && (
//             <div className="text-center py-4 bg-red-100 rounded-lg mb-4">
//               <p className="text-red-600 font-semibold">⚠️ API Key Missing!</p>
//               <p className="text-red-500 text-sm mt-2">
//                 Please create a .env file with
//                 VITE_API_KEY=your_openweathermap_api_key
//               </p>
//             </div>
//           )}

//           {loading && (
//             <div className="text-center py-4">
//               <p className="text-blue-600 font-semibold">Searching cities...</p>
//             </div>
//           )}

//           {error && (
//             <div className="text-center py-4 bg-red-100 rounded-lg mb-4">
//               <p className="text-red-600 font-semibold">{error}</p>
//             </div>
//           )}

//           {!loading &&
//             !error &&
//             searchCity &&
//             cities.length === 0 &&
//             APIKEY && (
//               <div className="text-center py-4">
//                 <p className="text-gray-600">
//                   No cities found. Try a different search term.
//                 </p>
//               </div>
//             )}
//         </div>

//         <div className="flex flex-col">
//           <div className="-m-1.5 overflow-x-auto">
//             <div className="p-1.5 min-w-full inline-block align-middle">
//               <div className="overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
//                   <thead>
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
//                       >
//                         City
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
//                       >
//                         State/Region
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
//                       >
//                         Country
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
//                       >
//                         Coordinates
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
//                     {cities.map((city, i) => (
//                       <tr
//                         className="hover:bg-gray-100 dark:hover:bg-neutral-700"
//                         key={`${city.name}-${city.cou_name_en}-${i}`}
//                       >
//                         <td
//                           className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 cursor-pointer hover:text-blue-600"
//                           onContextMenu={(e) =>
//                             handleRightClick(e, city.name, city.cou_name_en)
//                           }
//                         >
//                           <Link
//                             to={`/weather/${city.name},${city.cou_name_en}`}
//                           >
//                             {city.name}
//                           </Link>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
//                           {city.state || "N/A"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
//                           {city.cou_name_en}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
//                           {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>

//         {!searchCity && APIKEY && (
//           <div className="text-center py-8">
//             <p className="text-gray-600 text-lg">
//               Start typing a city name to search for weather data worldwide!
//             </p>
//             <p className="text-gray-500 text-sm mt-2">
//               You can search for cities in any country (India, USA, UK, Japan,
//               etc.)
//             </p>
//           </div>
//         )}
//       </div>
//     </>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            🌤️ Weather Explorer
          </h1>
          <p className="text-xl text-center text-blue-100">
            Discover weather conditions worldwide
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Search Cities Worldwide
              </h2>
              <p className="text-gray-600">
                Type any city name to explore its weather conditions
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none"
                placeholder="Search cities... (e.g., Mumbai, London, New York, Tokyo)"
                onChange={handleSearchCity}
                value={searchCity}
                disabled={!APIKEY}
              />
            </div>

            {/* Status Messages */}
            {!APIKEY && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">API Key Missing!</h3>
                      <p className="text-sm text-red-700 mt-1">
                        Please create a .env file with VITE_API_KEY=your_openweathermap_api_key
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
                  <span className="text-lg font-medium text-blue-600">Searching cities...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 font-medium text-center">{error}</p>
                </div>
              </div>
            )}

            {!loading && !error && searchCity && cities.length === 0 && APIKEY && (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                  </svg>
                  <p>No cities found. Try a different search term.</p>
                </div>
              </div>
            )}
          </div>

          {/* Results Table */}
          {cities.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">Search Results</h3>
                <p className="text-gray-600">Click on any city to view its weather</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        State/Region
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coordinates
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cities.map((city, i) => (
                      <tr
                        key={`${city.name}-${city.cou_name_en}-${i}`}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/weather/${city.name},${city.cou_name_en}`}
                            className="text-blue-600 hover:text-blue-800 font-medium text-lg hover:underline transition-colors duration-200"
                            onContextMenu={(e) => handleRightClick(e, city.name, city.cou_name_en)}
                          >
                            🏙️ {city.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {city.state || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {city.cou_name_en}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono text-sm">
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
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🌍</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Explore Weather Worldwide
                </h3>
                <p className="text-xl text-gray-600 mb-8">
                  Start typing a city name to discover weather conditions from around the globe
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-2xl mb-2">🇮🇳</div>
                    <p className="text-sm font-medium text-gray-700">India</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-2xl mb-2">🇺🇸</div>
                    <p className="text-sm font-medium text-gray-700">USA</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-2xl mb-2">🇬🇧</div>
                    <p className="text-sm font-medium text-gray-700">UK</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="text-2xl mb-2">🇯🇵</div>
                    <p className="text-sm font-medium text-gray-700">Japan</p>
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
