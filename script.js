const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "4f37f2b1be035dac982ce4e45a8f1dfc";
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (!city) {
    displayError("please enter city name ");
  } else {
    try {
      const weatherData = await getWeatherData(city, apiKey);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  }
});

async function getWeatherData(cityname, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}
function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");

  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay");
  card.appendChild(cityDisplay);

  const tempDisplay = document.createElement("p");

  tempDisplay.textContent = `${(temp - 273.5).toFixed(1)}°C`;
  tempDisplay.classList.add("tempDisplay");
  card.appendChild(tempDisplay);

  const humidityDisplay = document.createElement("p");

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");
  card.appendChild(humidityDisplay);

  const descDisplay = document.createElement("p");
  descDisplay.textContent = description;
  descDisplay.classList.add("descDisplay");
  card.appendChild(descDisplay);

  const weatherEmoji = document.createElement("p");
  weatherEmoji.textContent = getWeatherData(id);
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
