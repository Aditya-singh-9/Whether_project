const apiKey = '9293a9007363d2d85fb1432dd526e7ab';

async function getWeather() {
  const location = document.getElementById('location').value;
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
  const weatherData = await weatherResponse.json();
  displayCurrentWeather(weatherData);

  const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
  const forecastData = await forecastResponse.json();
  displayForecast(forecastData);

  displayWeatherThought(weatherData);
  displayWeatherImage(weatherData);
}

function displayCurrentWeather(data) {
  const currentWeatherDiv = document.getElementById('current-weather-data');
  currentWeatherDiv.innerHTML = `
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}

function displayForecast(data) {
  const forecastDiv = document.getElementById('forecast-data');
  forecastDiv.innerHTML = '';

  // Display 5-day forecast with intervals of 3 hours
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    forecastDiv.innerHTML += `
      <div>
        <p>${new Date(forecast.dt * 1000).toLocaleDateString()} ${new Date(forecast.dt * 1000).toLocaleTimeString()}</p>
        <p>Temp: ${forecast.main.temp}°C</p>
        <p>Weather: ${forecast.weather[0].description}</p>
      </div>
    `;
  }
}

function displayWeatherThought(data) {
  const weatherThoughtDiv = document.getElementById('weather-thought-data');
  const temp = data.main.temp;
  const description = data.weather[0].description;

  let thought = "It's a great day!";

  if (temp < 0) {
    thought = "Brrr! It's freezing outside. Stay warm!";
  } else if (temp < 10) {
    thought = "It's quite chilly. Don't forget your coat!";
  } else if (temp < 20) {
    thought = "A bit cool. A light jacket should be fine.";
  } else if (temp < 30) {
    thought = "Nice weather! Perfect for a walk outside.";
  } else {
    thought = "It's quite hot. Stay hydrated and cool!";
  }

  if (description.includes("rain")) {
    thought += " And don't forget your umbrella!";
  } else if (description.includes("snow")) {
    thought += " And be careful of the slippery roads!";
  } else if (description.includes("clear")) {
    thought += " Enjoy the clear skies!";
  }

  weatherThoughtDiv.innerHTML = `<p>${thought}</p>`;
}

function displayWeatherImage(data) {
  const weatherImageDiv = document.getElementById('weather-image');
  const description = data.weather[0].description.toLowerCase();
}
 
