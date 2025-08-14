import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import { useWeather } from './hooks/useWeather';
import { getWeatherBackground } from './utils/helpers';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [units, setUnits] = useState('metric'); // metric for Celsius, imperial for Fahrenheit
  const {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeatherByLocation,
    fetchWeatherByCity,
    getCurrentLocation
  } = useWeather();

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedUnits = localStorage.getItem('units') || 'metric';
    setDarkMode(savedDarkMode);
    setUnits(savedUnits);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('units', units);
  }, [units]);

  // Auto-load weather on app start
  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeatherByCity(lastCity, units);
    } else {
      getCurrentLocation();
    }
  }, []);

  const handleSearch = (city) => {
    fetchWeatherByCity(city, units);
    localStorage.setItem('lastCity', city);
  };

  const handleLocationClick = () => {
    getCurrentLocation();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleUnits = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    
    // Refetch data with new units
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity && weatherData) {
      fetchWeatherByCity(lastCity, newUnits);
    } else if (weatherData && weatherData.coord) {
      fetchWeatherByLocation(weatherData.coord.lat, weatherData.coord.lon, newUnits);
    }
  };

  const backgroundClass = weatherData ? getWeatherBackground(weatherData.weather[0].main, darkMode) : '';

  return (
    <div className={`min-h-screen transition-all duration-1000 ${darkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen ${backgroundClass} transition-all duration-1000`}>
        <div className="min-h-screen bg-black bg-opacity-10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                WeatherPro
              </h1>
              <div className="flex gap-4">
                <button
                  onClick={toggleUnits}
                  className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300 font-semibold"
                >
                  {units === 'metric' ? '°C' : '°F'}
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 bg-white bg-opacity-20 text-white rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </header>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} onLocationClick={handleLocationClick} />

            {/* Main Content */}
            <main className="space-y-8">
              {loading && <LoadingSpinner />}
              
              {error && (
                <div className="text-center">
                  <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm text-white p-4 rounded-xl max-w-md mx-auto">
                    <h3 className="font-semibold mb-2">Error</h3>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {weatherData && !loading && (
                <div className="space-y-8 animate-fadeIn">
                  <WeatherCard data={weatherData} units={units} />
                  
                  {forecastData && (
                    <Forecast data={forecastData} units={units} />
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;