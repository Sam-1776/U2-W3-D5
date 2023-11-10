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
  const row = document.createElement("div")
  row.className = "row mt-3 mb-4"
  const col1 = document.createElement("div")
  col1.className = "col-12 col-md-6 col-lg-5 mb-3"
  const col2 = document.createElement("div")
  col2.className = "col-12 col-md-6 col-lg-7"
  h1.innerText = `${x.brand} > ${x.name}`;
  const img = document.createElement("img");
  img.className = "rounded img-fluid"
  img.style = "width: 400px; height: 400px; object-fit: cover;"
  img.src = x.imageUrl;
  const h4 = document.createElement("h4");
  h4.innerText = `${x.name}`;
  const h5 = document.createElement("h5")
  h5.innerText =`${x.description}`;
  const p = document.createElement("p")
  p.className = "fs-4"
  p.innerText = `Price: ${x.price}$`;
  const button = document.createElement("button");
  button.innerText = "Back Home";
  button.className = "btn btn-light";
  button.onclick = function back() {
    window.location.assign("./homePage.html");
  };

  container.appendChild(h1);
  col1.appendChild(img);
  col2.appendChild(h4);
  col2.appendChild(h5)
  col2.appendChild(p)
  row.appendChild(col1)
  row.appendChild(col2)
  container.appendChild(row)
  container.appendChild(button);
}
