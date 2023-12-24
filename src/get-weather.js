// Globals 
const API_KEY = "17f17e6dd7b44606b63225044232312";
const BASE_URL = "http://api.weatherapi.com/v1";
const defaultLocation = "toronto"

// Return the current weather information for location
async function getLocationWeather(location) {
    const locationResponse = await fetch(`${BASE_URL  }/current.json?key=${  API_KEY  }&q=${location}`);
    const locationData = await locationResponse.json();
    return locationData;
}

// Return the 3 day forecast for location
async function getLocationForecast(location) {
    const locationForecast = await fetch(`${BASE_URL  }/forecast.json?key=${  API_KEY  }&q=${location}&days=3`);
    const forecastData = await locationForecast.json();
    return forecastData;
}

// Return the Basic current info for location
async function processCurrData(location) {
    // get the data
    const data = await getLocationWeather(location);

    const locationName = data.location.name;
    const locationRegion = data.location.region;
    const tempC = data.current.temp_c;
    const tempF = data.current.temp_f;
    const conditionDesc = data.current.condition.text;
    const conditionIcon = data.current.condition.icon;

    const retval =  {
        city: locationName,
        region: locationRegion,
        temp_c: tempC,
        temp_f: tempF,
        condition: conditionDesc,
        icon: conditionIcon
    }
    console.log(retval);
    return retval;
}

// Return forecast for next 3 days
async function processForecast(location) {
    const forecastData = await getLocationForecast(location);
    const retval = {};
    let dateNumber = 0;

    forecastData.forecast.forecastday.forEach((d) => {
        retval[dateNumber] = {
            date: d.date,
            temp_c: d.day.avgtemp_c,
            temp_f: d.day.avgtemp_f,
            condition: d.day.condition.text,
            icon: d.day.condition.icon
        };
        dateNumber += 1;
    });
    console.log(retval);
    return retval;
}

processCurrData(defaultLocation);
processForecast(defaultLocation);