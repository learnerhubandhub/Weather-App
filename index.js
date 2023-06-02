const apikey = "46f80a02ecae410460d59960ded6e1c6";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data)
    // console.log(typeof data)

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
          `Feels like: ${Math.round(data.main.feels_like)}`,
          `Humidity: ${data.main.humidity}%`,
          `Wind Speed: ${data.wind.speed}m/s`
    ]
    weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`
    weatherDataEl.querySelector(".description").textContent = `${description}`
    weatherDataEl.querySelector(".details").innerHTML = details.map((detailOfDetails)=>`<div>${detailOfDetails}</div>`).join("")




  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = ""
    weatherDataEl.querySelector(".description").textContent = "Error happened or city wrong"
    weatherDataEl.querySelector(".details").innerHTML = ""


  }
}