const API_KEY = '5a9d4b7e8c2f3d6a1b4e7c9f2e5a8b3d'; // You'll need to replace this with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    switch (response.status) {
      case 401:
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      case 404:
        throw new Error('City not found. Please check the city name and try again.');
      case 429:
        throw new Error('Too many requests. Please try again later.');
      default:
        throw new Error(errorData.message || `Error ${response.status}: Failed to fetch weather data`);
    }
  }
  
  return response.json();
};

export const fetchCurrentWeather = async (location, units = 'metric') => {
  const params = new URLSearchParams({
    appid: API_KEY,
    units
  });

  if (location.lat && location.lon) {
    params.append('lat', location.lat);
    params.append('lon', location.lon);
  } else if (location.city) {
    params.append('q', location.city);
  } else {
    throw new Error('Invalid location parameters');
  }

  const response = await fetch(`${BASE_URL}/weather?${params}`);
  return handleApiResponse(response);
};

export const fetchWeatherForecast = async (location, units = 'metric') => {
  const params = new URLSearchParams({
    appid: API_KEY,
    units
  });

  if (location.lat && location.lon) {
    params.append('lat', location.lat);
    params.append('lon', location.lon);
  } else if (location.city) {
    params.append('q', location.city);
  } else {
    throw new Error('Invalid location parameters');
  }

  const response = await fetch(`${BASE_URL}/forecast?${params}`);
  return handleApiResponse(response);
};