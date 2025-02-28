// document.addEventListener("DOMContentLoaded", () => {
//   axios
//     .get("data.json")
//     .then((response) => {
//       const foodList = document.getElementById("food-list");
//       const data = response.data;

//       data.forEach((food) => {
//         const foodItem = document.createElement("div");
//         foodItem.classList.add("food-item");

//         foodItem.innerHTML = `
//                     <h3>${food.name}</h3>
//                     <p>${food.price}</p>
//                 `;

//         foodList.appendChild(foodItem);
//       });
//     })
//     .catch((error) => console.error("Error fetching food data:", error));
// });
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("nav-bar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY < lastScrollY) {
      navbar.classList.remove("hidden");
    } else {
      navbar.classList.add("hidden");
    }
    lastScrollY = window.scrollY;
  });
});

document.getElementById("hamburger").addEventListener("click", function () {
  const icon = this.querySelector("i");
  const mbNav = document.getElementById("mb-nav-list");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
  mbNav.classList.toggle("mb-nav-list-close");
  mbNav.classList.toggle("mb-nav-list-open");
});

let menuData = [];
let categories = new Set();

// Load menu data from JSON
async function loadMenu() {
  try {
    const response = await fetch("data.json");
    menuData = await response.json();

    menuData.forEach((item) => categories.add(item.category));
    displayMenu(menuData);
  } catch (error) {
    console.error("Error loading menu data:", error);
  }
}

// Display filtered menu items
function displayMenu(items) {
  const menuContainer = document.getElementById("menu-list");
  menuContainer.innerHTML = "";

  items.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `
            <div class="menu-item-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-item-text">
              <h3>${item.name}</h3>
              <a href="menu-detail.html?id=${item.id}">
                <button>Learn More</button>
              </a>
            </div>
        `;
    menuContainer.appendChild(menuItem);
  });
}

// Filter menu by category
function filterMenu(category) {
  if (category === "All") {
    displayMenu(menuData);
    console.log(menuData);
  } else {
    const filteredItems = menuData.filter((item) => item.category === category);
    displayMenu(filteredItems);
    console.log(filteredItems);
  }
}

window.onload = loadMenu;

//For Menu Detail Page for each item
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const dishId = parseInt(params.get("id"), 10);
  const dishDetailElement = document.getElementById("menu-detail-container");

  const response = await fetch("data.json");
  menuData = await response.json();

  const dish = menuData.find((r) => r.id === dishId);
  console.log(dish);

  if (dish) {
    dishDetailElement.innerHTML = `
          <div class="menu-detail-img">
            <img src=${dish.image} alt=${dish.name} />
          </div>
          <div class="menu-detail-text">
            <span>${dish.category}</span>
            <h1>${dish.name}</h1>
            <p>
              ${dish.description}
            </p>
            <div class="menu-detail-info">
              <h2>Ingredients</h2>
              <ol>
                <li>Onion</li>
                <li>Garlic</li>
                <li>Tomato</li>
                <li>Chili</li>
                <li>Shan Noodles</li>
                <li>Chicken</li>
              </ol>
            </div>
          </div>
      `;
  } else {
    restaurantDetail.innerHTML = "<p>Data not found.</p>";
  }
});
