const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const total = document.querySelector('.total');
const body = document.querySelector('body');
const quantity = document.querySelector('.quantity');

openShopping.addEventListener("click", ()=> {
    body.classList.add("active");
})
closeShopping.addEventListener("click", ()=> {
    body.classList.remove("active");
})

let products = [
    {
        id: 1, 
        name: "Product 1", 
        image: "1.png",
        price: 2000
    },
    {
        id: 2, 
        name: "Product 2", 
        image: "2.png",
        price: 2200
    },
    {
        id: 3, 
        name: "Product 3", 
        image: "3.png",
        price: 2400
    },
    {
        id: 4, 
        name: "Product 4", 
        image: "4.png",
        price: 2600
    },
    {
        id: 5, 
        name: "Product 5", 
        image: "5.png",
        price: 1800
    },
    {
        id: 6, 
        name: "Product 6", 
        image: "6.png",
        price: 1600
    },
]

let listCards = [];

const initApp = () => {
    products.forEach((value, key)=> {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
        <img src="img/${value.image}">
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Cart</button>
        `
        list.appendChild(newDiv);
    })
}

initApp();

const addToCard = (key) => {
  if(listCards[key] == null){
   listCards[key] = JSON.parse(JSON.stringify(products[key]));
   listCards[key].quantity = 1;
  }
  reloadCard()
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key)=> {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
            <div><img src="img/${value.image}"></div>
            <div class="cardTitle">${value.name}</div>
            <div class="cardPrice">${value.price.toLocaleString()}</div>

            <div>
              <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
              <div class="count">${count}</div>
              <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            `
            // console.log(listCard)
            listCard.appendChild(newDiv);
            console.log(listCard)
        }
        console.log(total)
        total.innerText = totalPrice.toLocaleString();
        console.log(total)
        quantity.innerText = count;
        console.log(quantity)
    })
}


const changeQuantity = (key, quantity)=> {
    if(quantity == 0){
        delete listCards[key]
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}
