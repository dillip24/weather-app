# Weather App 🌤️

A modern, responsive weather application built with React and Vite that provides real-time weather information for any location in India using pincode search or automatic location detection.

## ✨ Features

- **🔍 Pincode Search**: Enter any Indian pincode to get weather information
- **📍 Auto Location**: Automatically detect and display weather for your current location
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🌡️ Temperature Units**: Toggle between Celsius and Fahrenheit
- **📅 7-Day Forecast**: Extended weather forecast with daily precipitation
- **🎨 Modern UI**: Beautiful gradient design with weather icons
- **⚡ Fast Loading**: Optimized performance with Vite
- **🌐 Client-Side Only**: No server required, deployable to GitHub Pages

## 🛠️ Technologies Used

- **React** - User interface library
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful weather icons
- **CSS3** - Modern styling with gradients and backdrop blur
- **JavaScript ES6+** - Modern JavaScript features

## 🌍 APIs Used

- **[Open-Meteo API](https://open-meteo.com/)** - Free weather API for forecast data
- **[Nominatim API](https://nominatim.openstreetmap.org/)** - OpenStreetMap geocoding for pincode to coordinates conversion
- **Browser Geolocation API** - For automatic location detection

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dillip24/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app running

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deployment

### GitHub Pages

This app is configured for easy deployment to GitHub Pages:

1. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://dillip24.github.io/weather-app"
   ```

2. **Deploy manually**:
   ```bash
   npm run deploy
   ```

3. **Or use GitHub Actions** (already configured):
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy

## 📱 Usage

### Search by Pincode
1. Enter any valid Indian pincode in the search box
2. Click the search button or press Enter
3. View the current weather and 7-day forecast

### Auto Location Detection
1. Click "Use Current Location" button
2. Allow location access when prompted
3. Weather data for your current location will be displayed

### Temperature Units
- Click the temperature unit button (°C/°F) to toggle between Celsius and Fahrenheit

## 🔧 Configuration

### Environment Variables

No environment variables are required for this app as it uses free, public APIs.

### API Rate Limits

- **Open-Meteo**: 10,000 requests per day (free tier)
- **Nominatim**: 1 request per second

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather data
- [OpenStreetMap](https://www.openstreetmap.org/) for geocoding services
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for the amazing build tool

---

Made with ❤️ using React and Vite
"# weather-app" 
