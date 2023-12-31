const URL = "https://striveschool-api.herokuapp.com/api/product";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjhiNDk1ZDRmNjAwMTg1NjI0ZWIiLCJpYXQiOjE2OTk2MDkwMzgsImV4cCI6MTcwMDgxODYzOH0.bOF_b4ZTUr_lrWJPQiW3Lx9U_6N0HUvSL5I2IS-fcPk";

  window.onload = () =>{
    takeProduct()
  }

  const takeProduct = () =>{
    fetch(URL,{
        headers: {
            Authorization: key,
          },
    })
    .then(resp => {
        if (!resp.ok) {
            if (resp.status === 400) {
              throw new Error("400 Bad request");
            }
            if (resp.status === 401) {
              throw new Error("401 Unauthorized");
            }
            if (resp.status === 403) {
              throw new Error("403 Forbidden");
            }
            if (resp.status === 404) {
              throw new Error("404 Not found");
            }
            if (resp.status === 429) {
                throw new Error("429 too many request");
              }
      
            throw new Error("Generic Fetching error");
          }
        const spinner = document.querySelector(".spinner-border");
        spinner.classList.add("d-none")
        return resp.json()})
    .then(arrObj => {
        generateCard(arrObj)
        console.log(arrObj)
    })
    .catch(err => {
        const errore = document.querySelector(".alert")
        errore.classList.remove("d-none")
        errore.innerText = err;
    })
  }


  const generateCard = (x) => {
    const container = document.querySelector(".container")
    const newContainer = document.createElement("div");
    newContainer.className = "container-md";
    container.appendChild(newContainer)
    const row = document.createElement("div");
    row.className = "row";
    x.forEach((element) => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
      const card = document.createElement("div");
      card.className = "card mb-4";
      card.style.height = "349px"
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.style = "height: 208px; object-fit: cover;"
      img.src = element.imageUrl;
      const cardBody = document.createElement("div");
      cardBody.className = "card-body position-relative";
      const h5 = document.createElement("h5");
      h5.className = "card-title mb-0";
      h5.innerText = `${element.brand}`;
      const p = document.createElement("p");
      p.className = "card-text mb-1";
      p.innerText = `${element.name}`;
      const div = document.createElement("div");
      div.className = "d-flex justify-content-between align-items-center";
      const divB = document.createElement("div");
      divB.className = "btn-group position-absolute";
      divB.style = "bottom: 10px; right: 15px"
      const buttonV = document.createElement("button");
      buttonV.className = "btn btn-sm btn-outline-secondary";
      buttonV.innerText = "More";
      buttonV.onclick = function info() {
        window.location.assign("./details.html?Id=" + element._id);
      };
      const buttonM = document.createElement("button");
      buttonM.className = "btn btn-sm btn-outline-secondary";
      buttonM.innerText = "Modify";
      buttonM.onclick = function mod() {
        window.location.assign("./backOffice.html?Id=" + element._id);
      };
  
      card.appendChild(img);
      card.appendChild(cardBody);
      cardBody.appendChild(h5);
      cardBody.appendChild(p);
      cardBody.appendChild(div);
      div.appendChild(divB);
      divB.appendChild(buttonV);
      divB.appendChild(buttonM)
      col.appendChild(card);
      row.appendChild(col);
    });
    newContainer.appendChild(row);
}