const lang = `en`;
const weatherCity = document.querySelector('.js-weather-city');
const weatherIcon = document.querySelector('.js-weather-icon');
const temperature = document.querySelector('.js-weather-temperature');
const weatherDescription = document.querySelector('.js-weather-description');
const wind = document.querySelector('.js-weather-wind');
const humidity = document.querySelector('.js-weather-humidity');
const errorText = document.querySelector('.js-weather-error');



async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=${lang}&appid=a62c4f8dcdfc543418fe150124bb12e5&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  if (data.cod === 200) {
    weatherIcon.className = 'weather__icon owf js-weather-icon';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)} °C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    showError(data);
  }
  else {
    showError(data);
    weatherIcon.className = '';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
}

function setCity(event) {
  if (event.code === 'Enter' || event.type === 'blur') {
    getWeather();
    weatherCity.blur();
  }
}

function showError(data) {
  if (data.message === 'city not found' || data.message === 'Nothing to geocode') {
    errorText.classList.add('active');
    errorText.textContent = 'City is not found. Please check spelling';
  }
  else {
    errorText.classList.remove('active');
    errorText.textContent = '';
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
weatherCity.addEventListener('keypress', setCity);
weatherCity.addEventListener('blur', setCity);
getLocalStorage();
