import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react'
import './WeatherForecast.css'

const WeatherForecast = ({ dailyData, unit }) => {
  if (!dailyData || !dailyData.time) {
    return null
  }

  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32)
    }
    return Math.round(temp)
  }

  const getWeatherIcon = (temp, precipitation) => {
    if (precipitation > 0) {
      return <CloudRain size={24} className="forecast-icon rain" />
    } else if (temp < 15) {
      return <CloudSnow size={24} className="forecast-icon snow" />
    } else if (temp > 25) {
      return <Sun size={24} className="forecast-icon sunny" />
    } else {
      return <Cloud size={24} className="forecast-icon cloudy" />
    }
  }

  const getDayName = (dateString, index) => {
    if (index === 0) return 'Today'
    if (index === 1) return 'Tomorrow'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  return (
    <div className="weather-forecast">
      <h3 className="forecast-title">7-Day Forecast</h3>
      <div className="forecast-container">
        {dailyData.time.slice(0, 7).map((date, index) => (
          <div key={date} className="forecast-item">
            <div className="forecast-day">
              {getDayName(date, index)}
            </div>
            
            <div className="forecast-icon-container">
              {getWeatherIcon(
                dailyData.temperature_2m_max[index], 
                dailyData.precipitation_sum[index]
              )}
            </div>
            
            <div className="forecast-temps">
              <span className="forecast-high">
                {convertTemp(dailyData.temperature_2m_max[index])}°
              </span>
              <span className="forecast-low">
                {convertTemp(dailyData.temperature_2m_min[index])}°
              </span>
            </div>
            
            <div className="forecast-precipitation">
              {dailyData.precipitation_sum[index]} mm
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherForecast
