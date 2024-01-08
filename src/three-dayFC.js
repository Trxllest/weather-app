/*
[
  {
    date: '2023-12-27',
    temp_c: 6.5,
    temp_f: 43.8,
    condition: 'Moderate rain',
    icon: '//cdn.weatherapi.com/weather/64x64/day/302.png'
  },
  {
    date: '2023-12-28',
    temp_c: 6.5,
    temp_f: 43.6,
    condition: 'Patchy rain possible',
    icon: '//cdn.weatherapi.com/weather/64x64/day/176.png'
  },
  {
    date: '2023-12-29',
    temp_c: 6.4,
    temp_f: 43.6,
    condition: 'Patchy rain possible',
    icon: '//cdn.weatherapi.com/weather/64x64/day/176.png'
  }
]
*/

import { processForecast } from "./get-weather";

const dailyFC = document.querySelector(".three-day-forecast");
const defaultLocation = "toronto";

function forecastComponent(fObj) {
  //   const weekday = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];

  const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  fObj.forEach((d) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const day = document.createElement("h3");
    const icon = document.createElement("div");
    const temp = document.createElement("h1");

    icon.classList.add("w-icon");
    day.classList.add("desc");
    temp.classList.add("temp");

    day.textContent = d;
    const dday = new Date(d.date);
    day.textContent = `${dday.getDate()}${nth(dday.getDate())}`;

    temp.textContent = `${d.temp_c}  \xB0C`;

    const img = new Image();
    img.src = d.icon;
    icon.appendChild(img);

    card.appendChild(day);
    card.appendChild(icon);
    card.appendChild(temp);

    dailyFC.appendChild(card);
  });
}

async function getFCData(location = defaultLocation) {
  const fcWeather = await processForecast(location);
  console.log(fcWeather);
  dailyFC.textContent = "";
  forecastComponent(fcWeather);
}

export { getFCData };
