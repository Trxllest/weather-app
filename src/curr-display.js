/* eslint-disable no-use-before-define */
import { processCurrData, processForecast } from "./get-weather";

const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector("#search");
const currSection = document.querySelector(".current-weather");

const celcius = "\xB0C";
const fahrenheit = "\xB0F";

// {
//   city: 'Toronto',
//   region: 'Ontario',
//   temp_c: 4,
//   temp_f: 39.2,
//   condition: 'Mist',
//   icon: '//cdn.weatherapi.com/weather/64x64/night/143.png'
// }
export default function displayCurr() {
  searchIcon.addEventListener("click", async () => {
    if (searchInput.value !== "") {
      const currWeather = await processCurrData(searchInput.value);
      console.log(currWeather);
      currComponent(currWeather);
    }
  });
}

function currComponent(wObj) {
  const compLeft = document.createElement("div");
  const compRight = document.createElement("div");
  
  const title = document.createElement("h3"); // "City, Region"
  title.classList.add("desc");
  const temp = document.createElement("h1");
  temp.classList.add("temp");

  title.textContent = `${wObj.city}, ${wObj.region}`;
  temp.textContent = `${wObj.temp_c} \xB0C`;

  compLeft.appendChild(title);
  compLeft.appendChild(temp);

  const icon = document.createElement("div");
  icon.classList.add("w-icon");
  const desc = document.createElement("h3");
  desc.classList.add("desc");

  const img = new Image();
  img.src = wObj.icon;
  icon.appendChild(img);
  desc.textContent = wObj.condition;

  compRight.appendChild(icon);
  compRight.appendChild(desc);

  currSection.appendChild(compLeft);
  currSection.appendChild(compRight)

}
