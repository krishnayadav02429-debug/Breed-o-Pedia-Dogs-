const API = "https://dog.ceo/api/breeds/image/random/12";

let dogs = [];
let favorites = new Set();
let showFav = false;

function initTheme() {
  const storedTheme = localStorage.getItem("theme");
  const defaultTheme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setTheme(defaultTheme);
}

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
}

async function loadDogs() {
  const res = await fetch(API);
  const data = await res.json();

  dogs = data.message.map((url) => {
    return {
      img: url,
      breed: url.split("/")[4],
      fav: false
    };
  });

  renderDogs(dogs);
}

function renderDogs(list) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  list.forEach((dog, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${dog.img}">
      <h3>${dog.breed}</h3>
      <div class="fav" onclick="toggleFav(${index})">
        ${dog.fav ? "❤️" : "🤍"}
      </div>
    `;

    grid.appendChild(card);
  });
}

function toggleFav(i) {
  dogs[i].fav = !dogs[i].fav;
  renderDogs(getCurrentList());
}

function filterDogs() {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = getCurrentList().filter(d =>
    d.breed.toLowerCase().includes(value)
  );

  renderDogs(filtered);
}

function showFavorites() {
  showFav = true;
  renderDogs(getCurrentList());
}

function showAll() {
  showFav = false;
  renderDogs(dogs);
}

function getCurrentList() {
  return showFav ? dogs.filter(d => d.fav) : dogs;
}

initTheme();
loadDogs();
