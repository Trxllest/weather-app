import "./style.css";
import {getCurrData} from "./curr-display";
import { getFCData } from "./three-dayFC";
import { getHrlyData } from "./hourly-display";

const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector("#search");

getCurrData();
getFCData();
getHrlyData();

function displayCurr() {
  searchIcon.addEventListener("click", () => {
    if (searchInput.value !== "") {
      getCurrData(searchInput.value);
      getFCData(searchInput.value);
      getHrlyData(searchInput.value);
    }
  });
}

displayCurr();