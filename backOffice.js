const URL = "https://striveschool-api.herokuapp.com/api/product";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjhiNDk1ZDRmNjAwMTg1NjI0ZWIiLCJpYXQiOjE2OTk2MDkwMzgsImV4cCI6MTcwMDgxODYzOH0.bOF_b4ZTUr_lrWJPQiW3Lx9U_6N0HUvSL5I2IS-fcPk";

window.onload = () => {
  const form = document.querySelector("form");
  form.onsubmit = sendProduct;
};

const sendProduct = (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("pName").value,
    description: document.getElementById("desctiption").value,
    brand: document.getElementById("brand").value,
    price: parseInt(document.getElementById("Price").value),
    imageUrl: document.getElementById("Img").value,
  };
  console.log(newProduct);

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((createdObj) => console.log(createdObj));
};
