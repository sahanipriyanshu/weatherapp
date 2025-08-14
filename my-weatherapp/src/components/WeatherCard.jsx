import React from 'react';
import { Cloud, Droplets, Wind, Eye, Sunrise, Sunset, Thermometer } from 'lucide-react';
import { formatTime, getWeatherIcon } from '../utils/helpers';

const WeatherCard = ({ data, units }) => {
  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Weather Card */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-8 mb-6 text-white shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">{data.name}, {data.sys.country}</h2>
          <p className="text-lg opacity-90">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Temperature and Condition */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="text-8xl mr-4 animate-bounce">
                {getWeatherIcon(data.weather[0].main)}
              </div>
              <div>
                <div className="text-6xl font-bold mb-2">{temp}{tempUnit}</div>
                <div className="text-xl capitalize">{data.weather[0].description}</div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start text-lg">
              <Thermometer className="w-5 h-5 mr-2" />
              <span>Feels like {feelsLike}{tempUnit}</span>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-10 rounded-2xl p-4 text-center">
              <Droplets className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm opacity-80">Humidity</div>
              <div className="text-xl font-semibold">{data.main.humidity}%</div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-2xl p-4 text-center">
              <Wind className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm opacity-80">Wind Speed</div>
              <div className="text-xl font-semibold">{Math.round(data.wind.speed)} {windUnit}</div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-2xl p-4 text-center">
              <Eye className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm opacity-80">Visibility</div>
              <div className="text-xl font-semibold">{Math.round(data.visibility / 1000)} km</div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-2xl p-4 text-center">
              <Cloud className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm opacity-80">Pressure</div>
              <div className="text-xl font-semibold">{data.main.pressure} hPa</div>
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 rounded-2xl p-4 text-center">
            <Sunrise className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm opacity-80">Sunrise</div>
            <div className="text-lg font-semibold">{formatTime(data.sys.sunrise)}</div>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-2xl p-4 text-center">
            <Sunset className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm opacity-80">Sunset</div>
            <div className="text-lg font-semibold">{formatTime(data.sys.sunset)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;