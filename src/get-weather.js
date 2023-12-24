// Globals 
const API_KEY = "17f17e6dd7b44606b63225044232312";
const BASE_URL = "http://api.weatherapi.com/v1";
const defaultLocation = "toronto"

async function getLocationWeather(location) {
    const locationResponse = await fetch(`${BASE_URL  }/current.json?key=${  API_KEY  }&q=${location}`);
    const locationData = await locationResponse.json();
    console.log(locationData);
    return locationData;
}

async function getLocationForecast(location) {
    const locationForecast = await fetch(`${BASE_URL  }/forecast.json?key=${  API_KEY  }&q=${location}&days=3`);
    const forecastData = await locationForecast.json();
    console.log(forecastData.forecast);
    return forecastData;
}

getLocationWeather(defaultLocation);
getLocationForecast(defaultLocation);

// function processData(data) {
//     const name;
//     const region;
//     const tempC;
//     const tempF;
// }