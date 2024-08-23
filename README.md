# Weather Forecast Application

A simple weather forecast web application that uses the OpenWeatherMap API to provide current weather and a 5-day forecast for a specified city. The application also allows users to use their current location to fetch weather data.

## Features

- Search for weather data by city name.
- View current weather conditions including temperature, description, humidity, and wind speed.
- View a 5-day weather forecast.
- Use the browser's geolocation feature to get weather data for your current location.
- View recently searched cities and you can select from them to view specific city weather data.

## Setup Instructions

### Prerequisites

- A web browser to view the application.
- An active internet connection.

### How to Run the Application

1. **Clone the repository** (if applicable) or download the HTML, CSS and  JavaScript files.

2. **Open the HTML file** (`index.html`) in a web browser.

### Configuration

1. **API Key**: Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api) and replace the placeholder in `script.js`:
    ```javascript
    const apiKey = 'YOUR_API_KEY_HERE';
    ```

### File Structure

- `index.html`: Contains the HTML structure and layout of the application.
- `script.js`: Contains the JavaScript code to fetch and display weather data.
- `styles.css`: (Optional) Custom CSS styles (not provided in this example).

### Usage

- **Search Weather**: Enter a city name in the search bar and click "Search" to view current weather and the 5-day forecast.
- **Current Location**: Click the "Use Current Location" button to fetch weather data for your current location.
- **Recent Searches**: Select a city from the "Recently Searched Cities" dropdown to view weather data for that city.

## Known Issues

- **API Limitations**: Free API keys may have limitations on the number of requests.
- **Geolocation**: Geolocation may not work if the user denies location access or if their browser does not support geolocation.