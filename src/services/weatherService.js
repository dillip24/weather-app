import axios from 'axios'

// Modular function to get latitude and longitude by pincode (from your server.js)
export async function getLatLonByPincode(pincode) {
  const url = 'https://nominatim.openstreetmap.org/search'
  const params = {
    postalcode: pincode,
    country: 'India',
    format: 'json',
    addressdetails: 1
  }
  const headers = {
    'User-Agent': 'weather-app/1.0'
  }

  try {
    const resp = await axios.get(url, { params, headers, timeout: 10000 })
    if (resp.data && resp.data.length > 0) {
      const { lat, lon, address } = resp.data[0]
      let location = 'Unknown Location'
      if (address) {
        location = address.city || address.town || address.village || address.state || 'Unknown Location'
      }
      return { lat: parseFloat(lat), lon: parseFloat(lon), location }
    } else {
      console.log('No results found for this PINCODE.')
      return null
    }
  } catch (error) {
    throw new Error(`Failed to fetch location data: ${error.message}`)
  }
}

// Function to get weather data from coordinates (from your server.js)
export async function getDataFromCoordinates(lat, lon) {
  const url = "https://api.open-meteo.com/v1/forecast"
  const params = {
    latitude: lat,
    longitude: lon,
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,wind_speed_10m_max",
    timezone: "auto",
    forecast_days: 7
  }

  try {
    const resp = await axios.get(url, { params, timeout: 10000 })
    if (resp.data) {
      return resp.data
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`)
  }
}

// Function to get current location weather using browser geolocation
export async function getCurrentLocationWeather() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const weatherData = await getDataFromCoordinates(latitude, longitude)
          resolve({
            weatherData,
            location: 'Current Location',
            coords: { lat: latitude, lon: longitude }
          })
        } catch (error) {
          reject(error)
        }
      },
      (error) => {
        reject(new Error('Unable to retrieve your location'))
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  })
}

// Function to get location name from coordinates (reverse geocoding)
export async function getLocationFromCoords(lat, lon) {
  const url = 'https://nominatim.openstreetmap.org/reverse'
  const params = {
    lat,
    lon,
    format: 'json',
    addressdetails: 1
  }
  const headers = {
    'User-Agent': 'weather-app/1.0'
  }

  try {
    const resp = await axios.get(url, { params, headers, timeout: 10000 })
    if (resp.data && resp.data.address) {
      const { address } = resp.data
      return address.city || address.town || address.village || address.state || 'Unknown Location'
    }
    return 'Unknown Location'
  } catch (error) {
    console.error('Failed to get location name:', error)
    return 'Unknown Location'
  }
}
