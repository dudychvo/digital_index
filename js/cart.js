let cart = {};
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

let tbody = document.getElementById("tbody");
let sum = document.getElementById("sum");

for (let id in cart) {
  let item = cart[id];

  let tr = document.createElement("tr");
  let image = document.createElement("img");

  let image_td = document.createElement("td");
  image.src = item.image;
  image.width = 100;
  tr.appendChild(image_td).appendChild(image);

  let title_td = document.createElement("td");
  title_td.textContent = item.title;
  tr.appendChild(title_td);

  let price_td = document.createElement("td");
  price_td.textContent = item.price;
  tr.appendChild(price_td);

  let qty_td = document.createElement("td");
  qty_td.textContent = item.qty;
  tr.appendChild(qty_td);

  tbody.appendChild(tr);
}

let p = document.createElement("p");

let res = 0;

for (const [key, value] of Object.entries(cart)) {
  res += value.price * value.qty;
}

p.textContent = `Total: £${res}`;
sum.appendChild(p);