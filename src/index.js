//Current date - complete

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0 ${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0 ${Minutes}`;
}

let displayDay = document.querySelector(".display-day");
displayDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;
let displayTime = document.querySelector(".display-time");
displayTime.innerHTML = `${currentHour}:${currentMinutes}`;

//Obtain weather per city search

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  let conditionsElement = document.querySelector("#current-conditions");
  temperatureElement.innerHTML = `${temperature} °C`;
  conditionsElement.innerHTML = response.data.weather[0].description;
  let location = document.querySelector("#input-city");
  location.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let unit = `metric`;
  let apiKey = `7fedc1d14d8eb9b728bca5549432aec4`;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiURL = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiURL}`).then(showTemperature);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

//Current position weather conditions

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = `7fedc1d14d8eb9b728bca5549432aec4`;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiURL = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getPosition);
