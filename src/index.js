import "./style.css";
import {getCurrData} from "./curr-display";
import { getFCData } from "./three-dayFC";
import { getHrlyData } from "./hourly-display";
import setGif from "./gif";

const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector("#search");

getCurrData();
getFCData();
getHrlyData();
setGif("toronto")

function displayCurr() {
  const fetchData = () => {
    if (searchInput.value.trim() !== "") {
      getCurrData(searchInput.value);
      getFCData(searchInput.value);
      getHrlyData(searchInput.value);
      setGif(searchInput.value);
    }
  };

  searchIcon.addEventListener("click", fetchData);

  // Use 'submit' event on the form to prevent page refresh
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    fetchData();
  });
}


displayCurr();