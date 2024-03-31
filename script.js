/* WEATHER SEARCH FUNCTION */
function refreshWeather(response) {
   let temperatureElement = document.querySelector("#temperature");
   let temperature = response.data.temperature.current;
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed");
   let timeElement = document.querySelector("#time");
   let date = new Date(response.data.time * 1000);
   let iconElement = document.querySelector("#icon");
   let bodyElement = document.querySelector("body");

/* ADJUST BG COLOUR ACCORDING TO TEMP */
   if (temperature < 10) {
      bodyElement.style.background = "linear-gradient(180.3deg, rgb(221, 221, 221) 5.5%, rgb(110, 136, 161) 90.2%)";
   } else if (temperature >= 10 && temperature < 15) {
      bodyElement.style.background = "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
   } else if (temperature >= 15 && temperature < 25) {
      bodyElement.style.background = "radial-gradient(circle at 10% 20%, rgb(137, 210, 253) 0%, rgb(255, 241, 188) 90%)";   
   } else if (temperature >= 25) {
      bodyElement.style.background = "linear-gradient(109.6deg, rgb(255, 230, 109) 11.2%, rgb(87, 232, 107) 100.2%)";
   } else {

/* DEFAULT BG COLOUR IF TEMP IS UNAVAILABLE*/
      bodyElement.style.background = "radial-gradient(circle at 12.3% 19.3%, rgba(85, 87, 218, 0.677) 0%, rgb(95, 209, 249) 100.2%)";
   }

   cityElement.innerHTML = response.data.city;  
   timeElement.innerHTML = formatDate(date);
   descriptionElement.innerHTML = response.data.condition.description; 
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`; 
   windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
   temperatureElement.innerHTML = Math.round(temperature);
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

   getForecast(response.data.city);
}


 /* WEATHER TIME & DATE FUNCTION */
function formatDate (date) {
   let minutes = date.getMinutes()
   let hours = date.getHours()
   let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

   let day = days[date.getDay()];

   if (minutes < 10) {
      minutes = `0${minutes}`
   }


   return `${day} ${hours}:${minutes}`

}

 /* WEATHER API QUERY */
 
function searchCity(city) {
   let apiKey = "2f103acf4b4o772b9dbdd6c4e500840t";
   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
   axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
   event.preventDefault();
   let searchInput = document.querySelector("#search-form-input");

   searchCity(searchInput.value);
}

function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let days = ['Sun','Mon','Tue','Wed','Thur','Fri', 'Sat']

   return days [date.getDay()];

}

function getForecast(city) {
   let apiKey = "2f103acf4b4o772b9dbdd6c4e500840t";
   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayForecast);
}


 /* 5 DAY WEATHER FORECAST FUNCTION */

 function displayForecast(response) {

   let forecastHtml = "";

   response.data.daily.forEach(function (day, index ) {
      if(index < 5) {
      forecastHtml = 
         forecastHtml + 
      `
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>


      <div class="weather-forecast-icon">
      <img src="${day.condition.icon_url}" class= "weather-forecast-icon"/>
      </div>
      <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
         <strong>${Math.round(day.temperature.maximum)}°</strong>
       </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
         </div>
      </div>
      `;
   }

   });

   let forecastElement = document.querySelector("#forecast");
   forecastElement.innerHTML = forecastHtml;
}


 /* CALL THE FUNCTIONS */

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("London");










