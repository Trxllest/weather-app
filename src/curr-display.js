/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import { processCurrData, processForecast } from "./get-weather";

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

// export function displayCurr() {
//   searchIcon.addEventListener("click", () => {
//     if (searchInput.value !== "") {
//       getData(searchInput.value);
//     }
//   });
// }

export async function getCurrData(location) {
  const currWeather = await processCurrData(location);
  console.log(currWeather);
  currSection.textContent = "";
  currComponent(currWeather);
}

function currComponent(wObj) {
  const compLeft = document.createElement("div");
  compLeft.classList.add("curr-Left");
  compLeft.classList.add("currCard");
  const compRight = document.createElement("div");
  compRight.classList.add("curr-Right");
  compRight.classList.add("currCard");

  const dayTime = document.createElement("h3");
  dayTime.classList.add("desc");

  const title = document.createElement("h3"); // "City, Region"
  title.classList.add("desc");

  const temp = document.createElement("h1");
  temp.classList.add("temp");

  title.textContent = `${wObj.city}, ${wObj.region}`;
  temp.textContent = `${wObj.temp_c} \xB0C`;
  const day = new Date(wObj.time).toLocaleDateString("en-us", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  dayTime.textContent = day;

  compLeft.appendChild(dayTime);
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
  currSection.appendChild(compRight);
}
