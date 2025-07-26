import { Sun, Cloud, CloudRain, CloudSnow, Wind, Eye, Droplets } from 'lucide-react'
import './WeatherCard.css'

const WeatherCard = ({ weatherData, location, unit, onToggleUnit }) => {
  const { daily, current_weather } = weatherData

  if (!daily || !daily.time) {
    return null
  }

  const today = daily.time[0]
  const maxTemp = daily.temperature_2m_max[0]
  const minTemp = daily.temperature_2m_min[0]
  const precipitation = daily.precipitation_sum[0]

  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32)
    }
    return Math.round(temp)
  }

  const getWeatherIcon = (temp, precipitation) => {
    if (precipitation > 0) {
      return <CloudRain size={80} className="weather-icon rain" />
    } else if (temp < 15) {
      return <CloudSnow size={80} className="weather-icon snow" />
    } else if (temp > 25) {
      return <Sun size={80} className="weather-icon sunny" />
    } else {
      return <Cloud size={80} className="weather-icon cloudy" />
    }
  }

  const getWeatherDescription = (temp, precipitation) => {
    if (precipitation > 0) {
      return `Rain expected`
    } else if (temp < 15) {
      return `Cold weather`
    } else if (temp > 25) {
      return `Sunny day`
    } else {
      return `Partly cloudy`
    }
  }

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className="location-info">
          <h2 className="location-name">{location}</h2>
          <p className="weather-description">
            {getWeatherDescription(maxTemp, precipitation)}
          </p>
        </div>
        <button 
          className="unit-toggle"
          onClick={onToggleUnit}
        >
          °{unit === 'celsius' ? 'C' : 'F'}
        </button>
      </div>

      <div className="weather-main">
        <div className="weather-icon-container">
          {getWeatherIcon(maxTemp, precipitation)}
        </div>
        
        <div className="temperature-container">
          <div className="main-temperature">
            {convertTemp(maxTemp)}°
          </div>
          <div className="temperature-range">
            H: {convertTemp(maxTemp)}° L: {convertTemp(minTemp)}°
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Droplets size={20} />
          <div className="detail-info">
            <span className="detail-label">Precipitation</span>
            <span className="detail-value">{precipitation} mm</span>
          </div>
        </div>
        
        <div className="detail-item">
          <Wind size={20} />
          <div className="detail-info">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{convertTemp((maxTemp + minTemp) / 2)}°</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
