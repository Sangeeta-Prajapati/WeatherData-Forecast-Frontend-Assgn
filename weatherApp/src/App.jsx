// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import CitiesTable from "./Components/CitiesTable";
// import WeatherPage from "./Components/WeatherPage";
 
// function App() {
//   return (
//     <>
//       <div>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<CitiesTable />} />
//             <Route path="/weather/:cityName" element={<WeatherPage />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import CitiesTable from "./Components/CitiesTable";
// import WeatherPage from "./Components/WeatherPage";
 
// function App() {
//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<CitiesTable />} />
//             <Route path="/weather/:cityName" element={<WeatherPage />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CitiesTable from "./Components/CitiesTable";
import WeatherPage from "./Components/WeatherPage";
 
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CitiesTable />} />
          <Route path="/weather/:cityName" element={<WeatherPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

