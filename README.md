# 🌤️ Weather Data Forecast Frontend Application

A modern, responsive weather application built with React and Vite that allows users to search for cities worldwide and view current weather conditions along with a 5-day forecast.

![Weather App Preview](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-green) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-blue)

## ✨ Features

- 🔍 **Global City Search**: Search for any city worldwide using OpenWeatherMap's Geocoding API
- 🌡️ **Current Weather**: Display real-time weather conditions including temperature, humidity, pressure, wind speed
- 📅 **5-Day Forecast**: Extended weather forecast with detailed daily predictions
- 🎨 **Beautiful UI**: Modern glass-morphism design with dynamic backgrounds
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 🌍 **International Support**: Search cities from any country (India, USA, UK, Japan, etc.)
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and build times
- 🎭 **Dynamic Backgrounds**: Weather-appropriate background images
- 🔄 **Real-time Updates**: Live weather data from OpenWeatherMap API

## 🚀 Demo

### Home Page - City Search
- Clean, intuitive search interface
- Real-time city suggestions as you type
- Country and coordinate information
- Professional table layout with hover effects

### Weather Page
- Current weather conditions with beautiful icons
- Detailed weather metrics (feels like, visibility, sunrise/sunset)
- 5-day forecast with daily predictions
- Dynamic background based on weather conditions

## 🛠️ Technologies Used

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Custom weather icons
- **API**: OpenWeatherMap API

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (free registration required)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone  https://github.com/Sangeeta-Prajapati/WeatherData-Forecast-Frontend-Assgn.git
   
   cd WeatherData-Forecast-Frontend-Assgn/weatherApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your OpenWeatherMap API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key
   

4. **Create environment file**
   Create a `.env` file in the `weatherApp` directory:
   ```env
   VITE_API_KEY=your_openweathermap_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
weatherApp/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── cloud.png
│   │   │   ├── rain.jpeg
│   │   │   └── sun.jpeg
│   │   └── images/
│   │       ├── Clear.jpg
│   │       ├── Cloudy.jpg
│   │       ├── Rainy.jpg
│   │       └── Sunny.jpg
│   ├── Components/
│   │   ├── CitiesTable.jsx
│   │   ├── ForeCast.jsx
│   │   └── WeatherPage.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Usage

### Searching for Cities
1. Type any city name in the search box
2. Results will appear automatically as you type
3. Click on any city to view its weather

### Viewing Weather
- Current temperature and conditions
- High/low temperatures for the day
- Weather details (humidity, pressure, wind speed, etc.)
- 5-day forecast with daily predictions

### Navigation
- Right-click on any city to open weather in a new tab
- Use the back button to return to search
- Responsive design works on mobile and desktop

## 🌐 API Integration

This application uses the OpenWeatherMap API for:

- **Geocoding API**: For city search functionality
  ```
  https://api.openweathermap.org/geo/1.0/direct?q={city}&appid={API_KEY}
  ```

- **Current Weather API**: For real-time weather data
  ```
  https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}
  ```

- **5-Day Forecast API**: For extended weather predictions
  ```
  https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}
  ```


## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌍 Supported Locations

Search for cities from any country:
- 🇮🇳 India: Mumbai, Delhi, Bangalore, Chennai
- 🇺🇸 USA: New York, Los Angeles, Chicago, Miami
- 🇬🇧 UK: London, Manchester, Birmingham, Liverpool
- 🇯🇵 Japan: Tokyo, Osaka, Kyoto, Hiroshima
- 🇫🇷 France: Paris, Lyon, Marseille, Nice
- And many more countries worldwide!

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error (401 Unauthorized)**
   - Ensure your API key is correctly set in the `.env` file
   - Check that the API key is active (may take up to 2 hours)
   - Verify the `.env` file is in the correct directory

2. **City Not Found**
   - Try different spelling variations
   - Include country name (e.g., "Paris, France")
   - Check for typos in the city name

3. **Build Issues**
   - Delete `node_modules` and run `npm install` again
   - Clear browser cache
   - Restart the development server


## 👨‍💻 Author

**Sangeeta Prajapati**
- GitHub: [@Sangeeta-Prajapati](https://github.com/Sangeeta-Prajapati)

---

⭐ **Star this repository if you found it helpful!** ⭐
