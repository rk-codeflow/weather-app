const input = document.querySelector("input");
const searchButton = document.querySelector(".search");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherDivContent = document.querySelector(".weather-content-details");
const weatherImage = document.querySelector(".weather-content-details img");
const noCity = document.querySelector(".city-not-found");

const APIkey = "e7601e12ef4ac998941160bff40570d1";
let city = "";
let url =
  "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey}";

function getWeatherDetails() {
  city = input.value;
  const updatedUrl = url.replace("{city}", city).replace("{APIkey}", APIkey);
  fetch(updatedUrl)
    .then((res) => {
      if (!res.ok) {
        noCity.style.display = "block";
        weatherDivContent.style.display = "none";
      } else {
        noCity.style.display = "none";
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      temp.innerHTML = `${Math.floor(
        data.main.temp - 273.15
      )} <span>&deg</span>C`;
      weather.innerHTML = data.weather[0].main;
      humidity.innerHTML = `${data.main.humidity} %`;
      wind.innerHTML = `${data.wind.speed} <span>Km/h</span>`;
      weatherDivContent.style.display = "block";

      // updating image based on weather condition
      const weatherStatus = data.weather[0].main;
      console.log(weatherStatus);
      switch (weatherStatus) {
        case "Clear":
          weatherImage.src = "/images/clear.png";
          break;
        case "Clouds":
          weatherImage.src = "/images/cloud.png";
          break;
        case "Mist":
          weatherImage.src = "/images/mist.png";
          break;
        case "Rain":
          weatherImage.src = "/images/rain.png";
          break;
        case "Snow":
          weatherImage.src = "/images/snow.png";
          break;
        default:
          weatherImage.src = "/images/clear.png";
      }
    })
    .catch((err) => console.log(err));
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeatherDetails();
  }
});

searchButton.addEventListener("click", () => {
  getWeatherDetails();
});
