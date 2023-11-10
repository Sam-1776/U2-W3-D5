const URL = "https://striveschool-api.herokuapp.com/api/product";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjhiNDk1ZDRmNjAwMTg1NjI0ZWIiLCJpYXQiOjE2OTk2MDkwMzgsImV4cCI6MTcwMDgxODYzOH0.bOF_b4ZTUr_lrWJPQiW3Lx9U_6N0HUvSL5I2IS-fcPk";

  const params = new URLSearchParams(window.location.search);
  const newId = params.get("Id"); 

const URLId = "https://striveschool-api.herokuapp.com/api/product/" + newId;


window.onload = () => {
  const form = document.querySelector("form");
  const resBtn = document.querySelector("button[type='button'].btn-outline-success")
    resBtn.onclick = resetValue;
  if (!newId) {
      form.onsubmit = sendProduct;
  } else {
    checkMod()
  }
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
    .then((createdObj) => {
        window.location.assign("./homePage.html")
        console.log(createdObj)
    })
    .catch(err =>console.log(err))
};

const checkMod = () =>{
console.log("ciao");
fetch (URLId, {
    headers: {
        Authorization: key,
      },
})
.then(resp => resp.json())
.then(obj => {
    const form = document.querySelector("form")
    document.getElementById("pName").value = obj.name
    document.getElementById("desctiption").value = obj.description
    document.getElementById("brand").value = obj.brand
    document.getElementById("Price").value = obj.price
    document.getElementById("Img").value = obj.imageUrl
    form.onsubmit = modProduct;
    console.log(obj)
    const modBtn = document.querySelector("button[type='submit']")
    modBtn.innerHTML = "Modify"
    const delBtn = document.querySelector("button[type='button'].btn-outline-danger")
    delBtn.classList.remove("d-none")
    delBtn.onclick = deleteProduct;
})
}

const modProduct = (e) =>{
    e.preventDefault()
    console.log(e);
    const newProduct = {
        name: document.getElementById("pName").value,
        description: document.getElementById("desctiption").value,
        brand: document.getElementById("brand").value,
        price: parseInt(document.getElementById("Price").value),
        imageUrl: document.getElementById("Img").value,
      };
      console.log(newProduct);
      fetch(URLId, {
        method: "PUT",
        body: JSON.stringify(newProduct),
        headers: {
          Authorization: key,
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((createdObj) => {
            window.location.assign("./homePage.html")
            console.log(createdObj)})
        .catch(err =>console.log(err))
    }

const deleteProduct = () =>{
    const hasAccepted = confirm("sei sicuro di voler eliminare il prodotto?")

    if (hasAccepted) {
        fetch(URLId, {
            method: "DELETE",
            headers: {
                Authorization: key,
              },

        })
        .then(resp => {
            
            window.location.assign("./homePage.html")
            return resp.json()
            
        })
    }
}

const resetValue = () =>{
    const hasAccepted = confirm("sei sicuro di voler resettare i campi di testo?")
    if (hasAccepted) {
        document.getElementById("pName").value = " "
        document.getElementById("desctiption").value = " "
        document.getElementById("brand").value = " "
        document.getElementById("Price").value = " "
        document.getElementById("Img").value = " "
    }
}
