const apiKey = "53a892c910eb5554e67adabdeefed9ee";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // Fixed the spacing issue
    if (!response.ok) {
      throw new Error("City not found or invalid API key");
    }
    if(response.status == 404){
      document.querySelector(".error").style.display = "block"
      document.querySelector(".weather").style.display = "none"
    }
    else{
      const data = await response.json();

    console.log(data);

    // Update weather details
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    // Update weather icon based on condition
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    } 
  } 
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none"
}

    

    
    
searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim() === "") {
    alert("Please enter a city name");
    return;
  }
  checkWeather(searchBox.value.trim());
});
