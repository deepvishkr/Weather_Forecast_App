// Replace with your API key
const apiKey = '79750a73ce86a617a1101487af2973c3'; 

// Replace with your URL
const apiBase = 'https://api.openweathermap.org/data/2.5/'; 

//DOM Elements
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const currentWeather = document.getElementById('currentWeather');
const extendedForecast = document.getElementById('extendedForecast');
const forecastContainer = document.getElementById('forecastContainer');
const recentCitiesDropdown = document.getElementById('recentCitiesDropdown');
const currentLocationButton = document.getElementById('currentLocationButton');

// Fetch weather data from API based on city name
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${apiBase}weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayCurrentWeather(data);
        await fetchForecastData(data.coord.lat, data.coord.lon);
        updateRecentCitiesDropdown(city);

        //Clear the search bar
        cityInput.value = ''; 

    } catch (error) {
        alert(error.message);
    }

}


// Fetch 5-day forecast data from API based on coordinates
async function fetchForecastData(lat, lon) {
    try {
        const response = await fetch(`${apiBase}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('Forecast data not found');
        const data = await response.json();
        displayExtendedForecast(data.list);
    } catch (error) {
        alert(error.message);
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    

    location.textContent = `Location: ${data.name}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Condition: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
   

    
}

// Display extended 5-day forecast
function displayExtendedForecast(forecast) {
    forecastContainer.innerHTML = '';

    forecast.forEach(item => {
        if (item.dt_txt.includes('12:00:00')) {
            // Filter to show only midday forecasts
            const card = document.createElement('div');
            card.className = 'bg-blue-100 p-4 rounded-md';

            const date = new Date(item.dt * 1000).toDateString();
            const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
            const temp = `Temp: ${item.main.temp}°C`;
            const wind = `Wind: ${item.wind.speed} m/s`;
            const humidity = `Humidity: ${item.main.humidity}%`;

            card.innerHTML = `
                <p class="font-semibold">${date}</p>
                <img src="${icon}" alt="${item.weather[0].description}">
                <p>${temp}</p>
                <p>${wind}</p>
                <p>${humidity}</p>
            `;

            forecastContainer.appendChild(card);
        }
    });
}

// Update recent cities dropdown
function updateRecentCitiesDropdown(city) {
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

    if (!recentCities.includes(city)) {
        recentCities.push(city);
        localStorage.setItem('recentCities', JSON.stringify(recentCities));
    }

    recentCitiesDropdown.innerHTML = '<option value="" disabled selected>Recently Searched Cities</option>';
    recentCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        recentCitiesDropdown.appendChild(option);
    });
}

// Handle search button click
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Handle recent cities dropdown change
recentCitiesDropdown.addEventListener('change', () => {
    const city = recentCitiesDropdown.value;
    if (city) {
        fetchWeatherData(city);
    }
});

// Handle current location search button
currentLocationButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataFromCoords(latitude, longitude);
    }, error => {
        console.error('Error getting location:', error);
    });
})


// Fetch weather data using coordinates
async function fetchWeatherDataFromCoords(lat, lon) {
    try {
        const response = await fetch(`${apiBase}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        displayCurrentWeather(data);
        await fetchForecastData(lat, lon);
    } catch (error) {
        alert(error.message);
    }
}
