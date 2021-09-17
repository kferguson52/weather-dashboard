var APIkey = "a2517b391d3646a20841118e642d9020";
var searchBtn = document.querySelector("#searchBtn");

function handleFormSubmit(e) {
  e.preventDefault();
  var userInput = document.getElementById("city").value;
  weatherAPI(userInput);
  userInput.value = "";
}

searchBtn.addEventListener("click", handleFormSubmit);
function weatherAPI(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      oneCall(data);
    });
}
function oneCall(data) {
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  var cityName = data.name;
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIkey}`
  )
    .then((res) => res.json())
    .then((data) => {
      renderCurrentWeather(data.current, cityName);
      renderForecast(data.daily);
    });
}

function renderCurrentWeather(current, city) {
  //create variable for data in the current paramente. we need temp, wind, humidity, uvi, date (google converting unix timestamp into date.) icon and how to display icon(hint google open weather icon)
  var cityName = city;
  var temp = current.temp;
  var wind = current.wind_speed;
  var humid = current.humidity;
  var uvi = current.uvi;
  var dateUnix = current.dt;
  var dateMilSec = dateUnix * 1000;
  var dateObject = new Date(dateMilSec);
  var dateString = dateObject.toLocaleString();
  var pDate = document.createElement("h5");
  pDate.textContent = "Today's Date: " + dateString;
  document.getElementById("current").appendChild(pDate);
  var pCity = document.createElement("h5");
  pCity.textContent = "City: " + cityName;
  document.getElementById("current").appendChild(pCity);
  var pTemp = document.createElement("h5");
  pTemp.textContent = "Temperature: " + temp;
  document.getElementById("current").appendChild(pTemp);
  var pWind = document.createElement("h5");
  pWind.textContent = "Wind Speed (mph) : " + wind;
  document.getElementById("current").appendChild(pWind);
  var pHum = document.createElement("h5");
  pHum.textContent = "Humidity: " + humid;
  document.getElementById("current").appendChild(pHum);
  //create elements that we need to displau
  //set textContext in those elements
  //append all created elements in the appropriate container.
}

function renderForecast(days) {
  for (var i = 1; i < days.length; i++) {
    var h5DateTimeEl = document.createElement("h5");
    var h5DateTimeVal = days[i].dt * 1000;
    var dateObject2 = new Date(h5DateTimeVal);
    var dateString2 = dateObject2.toLocaleString();
    var forTemp = days[i].temp.day;
    console.log(forTemp);
    var forWind = days[i].wind_speed;
    var forHumid = days[i].humidity;
    h5DateTimeEl.textContent = "Date: " + dateString2;
    document.getElementById("5-day").appendChild(h5DateTimeEl);
    localStorage.setItem("date", h5DateTimeEl.innerHTML);
    var hTemp = document.createElement("h5");
    hTemp.textContent = "Temperature: " + forTemp;
    document.getElementById("5-day").appendChild(hTemp);
    localStorage.setItem("temp", hTemp.innerHTML);
    var hWind = document.createElement("h5");
    hWind.textContent = "Wind Speed(mph): " + forWind;
    document.getElementById("5-day").appendChild(hWind);
    var hwStore = localStorage.setItem("wind", hWind.innerHTML);
    var hHumid = document.createElement("h5");
    hHumid.textContent = forHumid;
    document.getElementById("5-day").appendChild(hTemp);
    var htStore = localStorage.setItem("humid", hHumid.innerHTML);
  }
}

// After getting the lat and long values from the geo API store in variable, we are gonna use these values to call the One Call Api
// Write a function that calls the One Call API to retreive the info for the forecast
// Populates the div blocks with the upcoming 5 day forecast current weather info
