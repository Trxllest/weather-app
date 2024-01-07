// Globals
const API_KEY = "DVrRXnEwn0X9AY4F6pEbLXuFKWxtVHHj";
const BASE_URL = "http://api.giphy.com/v1/gifs/search";

// Return the gif info based on weather
async function getGifData(weather) {
  const gifResponse = await fetch(
    `${BASE_URL}?q=${weather}&api_key=${API_KEY}&limit=5`
  );
  const gifData = await gifResponse.json();
  console.log(gifData);
  return gifData;
}

getGifData("Cloudy");
