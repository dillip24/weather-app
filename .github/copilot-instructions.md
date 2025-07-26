# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React weather application built with Vite that:

## Project Structure
- Uses React with functional components and hooks
- Implements weather data fetching from Open-Meteo API
- Uses Nominatim API for geocoding (pincode to coordinates)
- Features automatic location detection using browser geolocation
- Supports manual pincode search
- Displays 7-day weather forecast
- Has a modern, responsive UI design

## APIs Used
- **Open-Meteo API**: `https://api.open-meteo.com/v1/forecast` for weather data
- **Nominatim API**: `https://nominatim.openstreetmap.org/search` for geocoding
- **Browser Geolocation API**: For automatic location detection

## Key Features
- Client-side only (no server required)
- GitHub Pages deployment ready
- Temperature unit toggle (°C/°F)
- Location-based weather display
- Pincode search functionality
- Modern gradient UI with weather icons
- Error handling and loading states

## Code Style
- Use functional components with hooks
- Implement proper error handling
- Use async/await for API calls
- Follow React best practices
- Use CSS modules or styled components for styling
