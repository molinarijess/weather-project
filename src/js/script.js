let apiKey = `1f17ba351ee112a37d7633ae135f9016`;
let lat;
let lon;
let units;

function showTodaysTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let geoLocationPlace = response.data.name;
  let showTemperature = document.querySelector("#temperature");
  showTemperature.innerHTML = `${temperature}`;
  let cityGeoLocation = document.querySelector("h2.city");
  cityGeoLocation.innerHTML = `${geoLocationPlace.toUpperCase()}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("class", `wi wi-owm-${response.data.weather[0].id}`);
  let weatherDescription = document.querySelector("div.weather-description");
  weatherDescription.innerHTML = `the sky today: ${response.data.weather[0].description}`;
}

function initialdisplay() {
  let cityDisplay = "London";
  let city = document.querySelector("h2.city");
  city.innerHTML = `${cityDisplay.toUpperCase()}`;
  let apiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay}&appid=${apiKey}&units=metric`;
  axios.get(apiSearch).then(showTodaysTemperature);
}
initialdisplay();

let searchCity = document.querySelector("#new-place");
searchCity.addEventListener("search", changeCityName);
let searchNewPlace = document.querySelector("h2.city");

function changeCityName(event) {
  event.preventDefault();
  if (searchCity.value === "" || searchCity.value === undefined) {
    let cityDefault = "London";
    searchNewPlace.innerHTML = `${cityDefault.toUpperCase()}`;
    let apiDefault = `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=${apiKey}&units=${units}`;
    axios.get(apiDefault).then(showTodaysTemperature);
  } else {
    searchNewPlace.innerHTML = `${searchCity.value.toUpperCase()}`;
    let apiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${event.currentTarget.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiSearch).then(showTodaysTemperature);
  }
}

function changeUnit(event) {
  event.preventDefault();
  if (link.innerHTML === "°C") {
    changeTemperatureToF();
    link.innerHTML = "°F";
  } else {
    link.innerHTML = "°C";
    changeTemperatureToC();
  }
}
var link = document.querySelector("#link");
link.addEventListener("click", changeUnit);

function changeTemperatureToF() {
  let unitImperial = `imperial`;
  let linkF = `https://api.openweathermap.org/data/2.5/weather?q=${searchNewPlace.innerHTML}&appid=${apiKey}&units=${unitImperial}`;
  axios.get(linkF).then(showTodaysTemperature);
}

function changeTemperatureToC() {
  let unitMetric = `metric`;
  let linkC = `https://api.openweathermap.org/data/2.5/weather?q=${searchNewPlace.innerHTML}&appid=${apiKey}&units=${unitMetric}`;
  axios.get(linkC).then(showTodaysTemperature);
}

let myLocation = document.querySelector("#geo-location");
myLocation.addEventListener("click", () => {
  let apiShowLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiShowLocation).then(showTodaysTemperature);
});

function geoLocation(position) {
  units = "metric";
  lat = position.coords.latitude;
  lon = position.coords.longitude;
}
navigator.geolocation.getCurrentPosition(geoLocation);

let now = new Date();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const followingDays = weekDays[now.getDay()];

function showTodaysWeek() {
  let weekToday = document.querySelector("div.todays-week");
  weekToday.innerHTML = `${followingDays}`;
}
showTodaysWeek();

function currentTime() {
  let now = new Date();
  let currentHours = now.getHours();
  let currentMinute = now.getMinutes();
  if (currentHours < 10) {
    currentHours = "0" + currentHours;
  }
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }
  let clock = document.querySelector("div.time-now");
  clock.innerHTML = `${currentHours}:${currentMinute}`;
  setTimeout(currentTime, 1000);
}
currentTime();
