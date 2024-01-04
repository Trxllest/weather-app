/* eslint-disable no-use-before-define */
/*
[
    forecastData.forecast.forecastday[0].hour
  {
    time_epoch: 1703653200,
    time: '2023-12-27 00:00',
    temp_c: 6.3,
    temp_f: 43.4,
    is_day: 0,
    condition: {
      text: 'Fog',
      icon: '//cdn.weatherapi.com/weather/64x64/night/248.png',
      code: 1135
    },
    wind_mph: 4.5,
    wind_kph: 7.2,
    wind_degree: 53,
    wind_dir: 'NE',
    pressure_mb: 1017,
    pressure_in: 30.05,
    precip_mm: 0.01,
    precip_in: 0,
    snow_cm: 0,
    humidity: 98,
    cloud: 100,
    feelslike_c: 5,
    feelslike_f: 41,
    windchill_c: 5,
    windchill_f: 41,
    heatindex_c: 6.3,
    heatindex_f: 43.4,
    dewpoint_c: 6,
    dewpoint_f: 42.7,
    will_it_rain: 1,
    chance_of_rain: 78,
    will_it_snow: 0,
    chance_of_snow: 0,
    vis_km: 0,
    vis_miles: 0,
    gust_mph: 8.8,
    gust_kph: 14.2,
    uv: 1
  },
  ...
]
*/

import { getLocationForecast } from "./get-weather";

const hourlyFC = document.querySelector(".hourly-forecast");
let myIndex = 0;
const defaultLocation = "toronto";

function nextSlide() {
  console.log(myIndex);
  if (myIndex >= 24) {
    myIndex = 0;
    showSlides(myIndex);
  } else if (myIndex <= 0) {
    myIndex = 16;
    showSlides(myIndex);
  } else {
    showSlides(myIndex);
  }
}

function showSlides(index) {
  const parent = document.querySelector(".slideshow-container");

  const allChildNodes = Array.from(parent.children);

  allChildNodes.forEach((child) => {
    child.classList.add("hide");
  });

  const visibleNodes = allChildNodes.slice(index, index + 8);

  visibleNodes.forEach((n) => {
    n.classList.remove("hide");
  });
}

function createImgSlider(hArray) {
  // Slider Wrapper
  //   const wrapper = document.createElement("div");
  //   wrapper.classList.add("slideWrapper");

  // Container
  const slideShowContainer = document.createElement("div");
  slideShowContainer.classList.add("slideshow-container");

  const hourArrows = document.createElement("div");
  hourArrows.classList.add("hourArrows");

  const leftArrow = document.createElement("div");
  leftArrow.textContent = "<";
  hourArrows.appendChild(leftArrow);

  const rightArrow = document.createElement("div");
  rightArrow.textContent = ">";
  hourArrows.appendChild(rightArrow);

  leftArrow.onclick = function () {
    myIndex -= 8;
    nextSlide();
  };

  rightArrow.onclick = function () {
    myIndex += 8;
    nextSlide();
  };

  hArray.forEach((h) => {
    slideShowContainer.appendChild(hourlyComponent(h));
  });
  hourlyFC.appendChild(hourArrows);
  hourlyFC.appendChild(slideShowContainer);
}

function hourlyComponent(hObj) {
  const card = document.createElement("div");
  card.classList.add("card");

  const time = document.createElement("h3");
  const icon = document.createElement("div");
  const temp = document.createElement("h1");

  icon.classList.add("w-icon");
  time.classList.add("desc");
  temp.classList.add("temp");

  const dtime = new Date(hObj.time);
  time.textContent = formatDate(dtime);

  temp.textContent = hObj.temp_c;

  const img = new Image();
  img.src = hObj.condition.icon;
  icon.appendChild(img);

  card.appendChild(time);
  card.appendChild(icon);
  card.appendChild(temp);
  card.classList.add("mySlides");
  return card;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

async function getHrlyData(location = defaultLocation) {
  let hourlyData = await getLocationForecast(location);
  hourlyData = hourlyData.forecast.forecastday[0].hour;
  hourlyFC.textContent = "";
  console.log(hourlyData);
  createImgSlider(hourlyData);
  showSlides(myIndex);
}

export { getHrlyData };
