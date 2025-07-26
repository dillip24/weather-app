import { useState, useEffect } from 'react'
import { MapPin, Search, Sun, Cloud, CloudRain, Wind, Thermometer } from 'lucide-react'
import { getLatLonByPincode, getDataFromCoordinates, getCurrentLocationWeather } from '../services/weatherService'
import WeatherCard from './WeatherCard'
import WeatherForecast from './WeatherForecast'
import './WeatherApp.css'

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')
  const [pincode, setPincode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unit, setUnit] = useState('celsius')

  // Auto-detect location on component mount
  useEffect(() => {
    detectLocation()
  }, [])

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser')
      return
    }

    setLoading(true)
    setError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const weather = await getDataFromCoordinates(latitude, longitude)
          if (weather) {
            setWeatherData(weather)
            setLocation('Current Location')
          }
        } catch (err) {
          setError('Failed to fetch weather data for current location')
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        setError('Unable to retrieve your location')
        setLoading(false)
      }
    )
  }

  const handlePincodeSearch = async () => {
    if (!pincode.trim()) {
      setError('Please enter a valid pincode')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await getLatLonByPincode(pincode.trim())
      if (result) {
        const weather = await getDataFromCoordinates(result.lat, result.lon)
        if (weather) {
          setWeatherData(weather)
          setLocation(result.location)
        }
      } else {
        setError('No results found for this pincode')
      }
    } catch (err) {
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePincodeSearch()
    }
  }

  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')
  }

  const getCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="weather-app">
      <div className="weather-container">
        {/* Header */}
        <div className="header">
          <h1 className="app-title">Weather App</h1>
          <div className="date">{getCurrentDate()}</div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Indian pincode..."
              className="search-input"
            />
            <button 
              onClick={handlePincodeSearch}
              className="search-button"
              disabled={loading}
            >
              <Search size={20} />
            </button>
          </div>
          <button 
            onClick={detectLocation}
            className="location-button"
            disabled={loading}
          >
            <MapPin size={16} />
            Use Current Location
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && !loading && (
          <>
            <WeatherCard 
              weatherData={weatherData}
              location={location}
              unit={unit}
              onToggleUnit={toggleUnit}
            />
            <WeatherForecast 
              dailyData={weatherData.daily}
              unit={unit}
            />
          </>
        )}

        {/* Default State */}
        {!weatherData && !loading && !error && (
          <div className="welcome-message">
            <Cloud size={64} className="welcome-icon" />
            <h2>Welcome to Weather App</h2>
            <p>Search for a location or use your current location to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherApp
