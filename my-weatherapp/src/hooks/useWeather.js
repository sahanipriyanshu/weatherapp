import { useState, useCallback } from 'react';
import { fetchCurrentWeather, fetchWeatherForecast } from '../utils/api';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByLocation = useCallback(async (lat, lon, units = 'metric') => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetchCurrentWeather({ lat, lon }, units),
        fetchWeatherForecast({ lat, lon }, units)
      ]);
      
      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCity = useCallback(async (city, units = 'metric') => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetchCurrentWeather({ city }, units),
        fetchWeatherForecast({ city }, units)
      ]);
      
      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      (err) => {
        let errorMessage = 'Unable to get your location';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred while getting location.';
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, [fetchWeatherByLocation]);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeatherByLocation,
    fetchWeatherByCity,
    getCurrentLocation
  };
};