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

let obj = {};
let type;
let textarea;
let submittedForm;

const form = document.querySelector(".feedback-form");
form && form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  for (const pair of formData.entries()) {
    console.log(pair);
    if (pair[0] === "email") {
      email = pair[1];
    }
    if (pair[0] === "type") {
      type = pair[1];
    }
    if (pair[0] === "textarea") {
      textarea = pair[1];
    }
    obj = {
      ...obj,
      type: type,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      textarea: textarea,
    };
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(obj),
    redirect: "follow",
  };

  var my_awesome_script = document.createElement("script");

  my_awesome_script.setAttribute("src", "https://cdn.jsdelivr.net/npm/sweetalert2@11");

  document.head.appendChild(my_awesome_script);

  let emailText = document.getElementById("email").value;
  let pattern = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
  let result = pattern.test(emailText);

  if (result) {
    fetch("https://646e973009ff19b1208618e6.mockapi.io/feedback", requestOptions)
      .then((response) => response.text())
      .then(() =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .then(() => window.location.reload());
  }
});

const contactForm = document.getElementById("contact-us-form");

contactForm && contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  alert('123');
  const formData = new FormData(contactForm);
  for (const pair of formData.entries()) {
    console.log(pair);
    if (pair[0] === "email") {
      email = pair[1];
    }
    if (pair[0] === "textarea") {
      textarea = pair[1];
    }
    obj = {
      ...obj,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      textarea: textarea,
    };
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(obj),
    redirect: "follow",
  };

  var my_awesome_script = document.createElement("script");

  my_awesome_script.setAttribute("src", "https://cdn.jsdelivr.net/npm/sweetalert2@11");

  document.head.appendChild(my_awesome_script);

  let emailText = document.getElementById("email").value;
  let pattern = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
  let result = pattern.test(emailText);

  if (result) {
    fetch("https://646e973009ff19b1208618e6.mockapi.io/contact_us", requestOptions)
      .then((response) => response.text())
      .then(() =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .then(() => window.location.reload());
  }
});
