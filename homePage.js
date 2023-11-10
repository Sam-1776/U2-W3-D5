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
    .then(resp => resp.json())
    .then(arrObj => {
        generateCard(arrObj)
        console.log(arrObj)
    })
    .catch(err => console.log(err))
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
      card.className = "card mb-4 shadow-sm";
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = element.imageUrl;
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      const h5 = document.createElement("h5");
      h5.className = "card-title mb-0";
      h5.innerText = `${element.brand}`;
      const p = document.createElement("p");
      p.className = "card-text mb-1";
      p.innerText = `${element.name}`;
      const div = document.createElement("div");
      div.className = "d-flex justify-content-between align-items-center";
      const divB = document.createElement("div");
      divB.className = "btn-group";
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