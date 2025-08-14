// Format timestamp to readable time
export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Get weather icon emoji based on condition
export const getWeatherIcon = (condition) => {
  const icons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Smoke: '🌫️',
    Haze: '🌫️',
    Dust: '🌫️',
    Fog: '🌫️',
    Sand: '🌫️',
    Ash: '🌋',
    Squall: '💨',
    Tornado: '🌪️'
  };
  
  return icons[condition] || '🌤️';
};

// Get background gradient based on weather condition
export const getWeatherBackground = (condition, isDark = false) => {
  const backgrounds = {
    Clear: isDark 
      ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900'
      : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
    Clouds: isDark
      ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900'
      : 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600',
    Rain: isDark
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900'
      : 'bg-gradient-to-br from-gray-600 via-blue-600 to-slate-600',
    Drizzle: isDark
      ? 'bg-gradient-to-br from-slate-800 via-blue-800 to-gray-900'
      : 'bg-gradient-to-br from-slate-500 via-blue-500 to-gray-600',
    Thunderstorm: isDark
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
      : 'bg-gradient-to-br from-gray-700 via-purple-700 to-gray-800',
    Snow: isDark
      ? 'bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900'
      : 'bg-gradient-to-br from-blue-200 via-slate-300 to-gray-400',
    Mist: isDark
      ? 'bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900'
      : 'bg-gradient-to-br from-gray-300 via-slate-400 to-gray-500',
    Fog: isDark
      ? 'bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900'
      : 'bg-gradient-to-br from-gray-300 via-slate-400 to-gray-500'
  };

  return backgrounds[condition] || (isDark 
    ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900'
    : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600');
};

// Convert temperature between Celsius and Fahrenheit
export const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return (temp * 9/5) + 32;
  } else if (fromUnit === 'imperial' && toUnit === 'metric') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

// Get local time for a given timezone offset
export const getLocalTime = (timezoneOffset) => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (timezoneOffset * 1000));
  
  return localTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};