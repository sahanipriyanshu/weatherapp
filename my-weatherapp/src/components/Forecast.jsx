import React from 'react';
import { getWeatherIcon } from '../utils/helpers';

const Forecast = ({ data, units }) => {
  if (!data || !data.list) return null;

  // Group forecast by day (take one forecast per day)
  const dailyForecasts = data.list.filter((forecast, index) => index % 8 === 0).slice(0, 5);
  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">5-Day Forecast</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
          const temp = Math.round(forecast.main.temp);
          const tempMin = Math.round(forecast.main.temp_min);
          const tempMax = Math.round(forecast.main.temp_max);

          return (
            <div
              key={forecast.dt}
              className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 text-white text-center hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105"
            >
              <div className="font-semibold mb-3">{dayName}</div>
              
              <div className="text-4xl mb-3 animate-pulse">
                {getWeatherIcon(forecast.weather[0].main)}
              </div>
              
              <div className="text-sm opacity-80 mb-2 capitalize">
                {forecast.weather[0].description}
              </div>
              
              <div className="space-y-1">
                <div className="text-xl font-bold">{temp}{tempUnit}</div>
                <div className="text-sm opacity-80">
                  {tempMax}{tempUnit} / {tempMin}{tempUnit}
                </div>
              </div>
              
              <div className="mt-3 text-xs opacity-70">
                {Math.round(forecast.main.humidity)}% humidity
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;