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
    .then((resp) => {
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
        return resp.json()})
    .then((createdObj) => {
        window.location.assign("./homePage.html")
        console.log(createdObj)
    })
    .catch(err => {
        const errore = document.querySelector(".alert")
        errore.classList.remove("d-none")
        errore.innerText = err;
    })
};

const checkMod = () =>{
console.log("ciao");
fetch (URLId, {
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
    return resp.json()})
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
.catch(err => {
    const errore = document.querySelector(".alert")
    errore.classList.remove("d-none")
    errore.innerText = err;
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
        .then((resp) =>{
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
            return resp.json()})
        .then((createdObj) => {
            window.location.assign("./homePage.html")
            console.log(createdObj)})
            .catch(err => {
                const errore = document.querySelector(".alert")
                errore.classList.remove("d-none")
                errore.innerText = err;
            })
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
            
            window.location.assign("./homePage.html")
            return resp.json()
            
        })
        .catch(err => {
            const errore = document.querySelector(".alert")
            errore.classList.remove("d-none")
            errore.innerText = err;
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
