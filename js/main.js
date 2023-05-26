const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  speed: 800,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const displayTime = document.querySelector(".display-time");
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: true });
  setTimeout(showTime, 1000);
}

showTime();

function updateDate() {
  let today = new Date();
  let dayName = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const IDCollection = ["day", "daynum", "month", "year"];
  const val = [dayWeek[dayName], dayNum, months[month], year];
  for (let i = 0; i < IDCollection.length; i++) {
    document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
  }
}

updateDate();

// Cart

let count = 0;
let sum = 0;
let cart = {};

if (localStorage.getItem("count")) {
  count = parseInt(localStorage.getItem("count"));
}

if (localStorage.getItem("sum")) {
  sum = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

let btns = document.querySelectorAll(".main button");

for (let i = 0; i < btns.length; i++) {
  let btn = btns[i];
  btn.addEventListener("click", add);
}

function add(event) {
  let price = Number(event.target.dataset.price);
  let title = event.target.dataset.title;
  let image = event.target.dataset.image;
  let id = event.target.dataset.id;

  if (id in cart) {
    cart[id].qty++;
  } else {
    let cartItem = {
      title: title,
      price: price,
      image: image,
      qty: 1,
    };
    cart[id] = cartItem;
  }

  count++;
  sum += price;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  document.getElementById("sum").textContent = sum;
  document.getElementById("count").textContent = count;
  localStorage.setItem("sum", sum);
  localStorage.setItem("count", count);
}

let carts = {};
if (localStorage.getItem("cart")) {
    carts = JSON.parse(localStorage.getItem("cart"));
}