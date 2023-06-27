const input = document.querySelector("input");
const searchButton = document.querySelector(".search");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherDivContent = document.querySelector(".weather-content-details");
const image = document.querySelector(".weather-content-details img");

const APIkey = "e7601e12ef4ac998941160bff40570d1";
let city = "";
let url =
  "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey}";

searchButton.addEventListener("click", () => {
  city = input.value;
  const updatedUrl = url.replace("{city}", city).replace("{APIkey}", APIkey);
  console.log(city);
  fetch(updatedUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      temp.innerHTML = `${Math.floor(
        data.main.temp - 273.15
      )} <span>&deg</span>C`;
      weather.innerHTML = data.weather[0].main;
      humidity.innerHTML = `${data.main.humidity} %`;
      wind.innerHTML = `${data.wind.speed} <span>Km/h</span>`;
      weatherDivContent.style.display = "block";
    })
    .catch((err) => console.log(err));
});
