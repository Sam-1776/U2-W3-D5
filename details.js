const URL = "https://striveschool-api.herokuapp.com/api/product";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjhiNDk1ZDRmNjAwMTg1NjI0ZWIiLCJpYXQiOjE2OTk2MDkwMzgsImV4cCI6MTcwMDgxODYzOH0.bOF_b4ZTUr_lrWJPQiW3Lx9U_6N0HUvSL5I2IS-fcPk";

const params = new URLSearchParams(window.location.search);
const newId = params.get("Id");
console.log(newId);

window.onload = () => {
  generateDetail();
};

const generateDetail = () => {
  fetch(URL + "/" + newId, {
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((obj) => {
      page(obj);
      console.log(obj)});
};

const page = (x) =>{
  const container = document.querySelector(".container");
  const h1 = document.createElement("h1");
  h1.innerText = `${x.name}`;
  const img = document.createElement("img");
  img.className = ("border border-secondary")
  img.src = x.imageUrl;
  const h4 = document.createElement("h4");
  h4.innerText = `${x.brand}`;
  const h5 = document.createElement("h5")
  h5.innerText =`${x.description}`;
  const p = document.createElement("p")
  p.innerText = `${x.price}€`;
  const button = document.createElement("button");
  button.innerText = "Back Home";
  button.className = "btn btn-light";
  button.onclick = function back() {
    window.location.assign("./homePage.html");
  };

  container.appendChild(h1);
  container.appendChild(img);
  container.appendChild(h4);
  container.appendChild(h5)
  container.appendChild(p)
  container.appendChild(button);
}
