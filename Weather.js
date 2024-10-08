const apiKey = "your-api-key"; // replace with your OpenWeatherMap API key
const apiUrl =
  "( Sign in and get the api link - https://openweathermap.org/ );

const searchInp = document.querySelector(".search-inp");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    searchInp.value = "";
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    document.querySelector(
      ".city"
    ).innerHTML = `${data.name} - ${data.sys.country}`;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".humidity").innerHTML = `${Math.round(
      data.main.humidity
    )}%`;
    document.querySelector(".wind").innerHTML = `${Math.round(
      data.wind.speed
    )}km/h`;
    document.querySelector(".feels_like").innerHTML = `${Math.round(
      data.main.feels_like
    )}°C`;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.classList.remove("margin");
      weatherIcon.src = "Images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.classList.remove("margin");
      weatherIcon.src = "Images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.classList.remove("margin");
      weatherIcon.src = "Images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.classList.remove("margin");
      weatherIcon.src = "Images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.classList.remove("margin");
      weatherIcon.src = "Images/mist.png";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "Images/haze.png";
      weatherIcon.classList.add("margin");
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.classList.remove("margin");
      weatherIcon.src = "Images/snow.png";
    } else {
      weatherIcon.classList.remove("margin");
      weatherIcon.src = "Images/search.png";
    }
  } catch {
    document.querySelector(".city").innerHTML = "Not Found";
    document.querySelector(".temp").innerHTML = `0°C`;
    document.querySelector(".humidity").innerHTML = `0%`;
    document.querySelector(".wind").innerHTML = `0km/h`;
    document.querySelector(".feels_like").innerHTML = `0°C`;
    weatherIcon.src = "Images/clear.png";
    document.querySelector("body").classList.add("red");
    setTimeout(() => {
      document.querySelector("body").classList.remove("red");
    }, 500);
    setTimeout(() => {
      document.querySelector(".city").innerHTML = "City Name";
    }, 500);
  }
}

searchBtn.addEventListener("click", async function () {
  let value = searchInp.value;
  checkWeather(value);
});
