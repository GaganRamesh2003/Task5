
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherInfo = document.querySelector(".weather-info");
const unitToggle = document.getElementById("unitToggle");

const apiKey = "d1845658f92b31c64bd94f06f7188c9c"; // Replace with your OpenWeatherMap API key

let currentTemperatureCelsius = null;
let currentTemperatureFahrenheit = null;
let currentUnit = "metric"; // Default is Celsius

// Function to set the background based on the weather condition
function setBackground(condition) {
    const body = document.body;
    if (condition.includes("clear")) {
        body.style.backgroundImage = "url('https://media.istockphoto.com/id/2150823955/photo/clouds-in-the-sky-in-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=NcSZt4g1ShC1zm3Etn5NddpwPNuglPAzoFanXcZBPi0=')";
    } else if (condition.includes("cloud")) {
    body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1691852517460-b5fc0f8f9114?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWR5JTIwbGFuZHNjYXBlfGVufDB8fDB8fHww')";
    } else if (condition.includes("rain")) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1727302559649-bff4f1f1dad8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhaW5pbmclMjBza3klMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D')";
    } else if (condition.includes("snow")) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1518873890627-d4b177c06e51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNub3dpbmclMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D')";
    } else if (condition.includes("thunderstorm")) {
        body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1726001034953-1786e4af3567?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGh1bmRlcnN0cm9tJTIwbGFuZHNjYXBlfGVufDB8fDB8fHww')";
    } else {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "100vh";  // Make sure the body takes full screen height
    document.body.style.margin = "0";  // Remove any default margin
    
}

// Function to fetch weather data
async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}`);
    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found!");
    } else {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        currentTemperatureCelsius = data.main.temp;
        currentTemperatureFahrenheit = (currentTemperatureCelsius * 9/5) + 32; // Convert Celsius to Fahrenheit
        updateTemperatureDisplay(currentUnit);

        weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        // Set the background based on the weather description
        setBackground(data.weather[0].description);

        weatherInfo.style.display = "block"; // Show weather info
        weatherInfo.classList.add("show");  // Add the 'show' class to trigger fadeIn animation
    }
}

// Function to update the temperature display based on the selected unit
function updateTemperatureDisplay(unit) {
    if (unit === "metric") {
        temperature.textContent = `Temperature: ${currentTemperatureCelsius}°C`;
        unitToggle.textContent = "°F";
    } else {
        temperature.textContent = `Temperature: ${currentTemperatureFahrenheit.toFixed(2)}°F`;
        unitToggle.textContent = "°C";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

// Event listener for unit toggle button
unitToggle.addEventListener("click", () => {
    if (currentUnit === "metric") {
        currentUnit = "imperial"; // Switch to Fahrenheit
    } else {
        currentUnit = "metric"; // Switch to Celsius
    }
    const city = cityInput.value;
    if (city) {
        getWeather(city); // Re-fetch the weather data based on the new unit
    }
});

// Optional: Allow pressing Enter to search
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
