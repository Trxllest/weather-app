// Globals
import { processCurrData } from "./get-weather";

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

export default async function setGif(location) {
  const weather = await processCurrData(location);
  const data = await getGifData(weather.condition);
  const gifLink = data.data[0].images.original.url;
  console.log(gifLink);

  const currSxn = document.querySelector(".current-weather");
  currSxn.style.background = `url(${gifLink}) center/cover no-repeat`;
  // currSxn.style.height = data.data[0].images.original.height;
}

setGif("Toronto");
