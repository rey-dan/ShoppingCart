// Objects
const items = [
    { id: 0 , name: "Cap", price: 20, image: "https://img.fruugo.com/product/2/80/230264802_max.jpg"},
    { id: 1 , name: "Tshirt", price: 50, image: "https://cdn.shopify.com/s/files/1/1002/7150/products/New-Mockups---no-hanger---TShirt-Yellow.jpg?v=1639657077"},
    { id: 2 , name: "Cap", price: 30, image: "https://contents.mediadecathlon.com/p1985538/6857946ffb8dd831ed1aec6281115426/p1985538.jpg"}
]

let cart = {};

// Selectors
const listItems = document.querySelector("#listItems");
const cartItems = document.querySelector("#cartItems");
const totalAmount = document.querySelector("#overallAmount");
const addItem = document.querySelector(".addItem");
const removeItem = document.querySelector(".removeItem");
const deleteItem = document.querySelector(".deleteItem");

// Event Listeners
document.addEventListener('DOMContentLoaded', getCartItems);
listItems.addEventListener('click', addItemToCart);
cartItems.addEventListener('click', adjustItem);

// Functions
function addItemToCart(e) {
    const item = e.target;
    const itemId = item.id;

    if(cart[itemId]){
        cart[itemId]++;
        const item = document.querySelector(`#quantity${itemId}`);
        item.innerText = cart[itemId];
        const equivalentPrice = document.querySelector(`#equivalentPrice${itemId}`);
        equivalentPrice.innerText = "$" + cart[itemId] * items[itemId].price;
    } else{
        cart[itemId] = 1;

        // Create a Cart Item
        const cartItem = document.createElement("li");
        cartItem.id = "ItemID" + itemId;
        const item = document.createElement("p");
        item.innerText = items[itemId].name;
        item.classList.add("itemName");
        cartItem.appendChild(item);
        const image = document.createElement("img");
        image.src = items[itemId].image;
        image.alt = items[itemId].name;
        cartItem.appendChild(image);
        const price = document.createElement("p");
        price.classList.add("price");
        price.innerText = "$" + items[itemId].price;
        cartItem.appendChild(price);

        const multiply = document.createElement("p");
        multiply.innerText = "x"
        cartItem.appendChild(multiply);

        const adjustItem = document.createElement("div");
        adjustItem.classList.add("adjustItem");
        const quantity = document.createElement("p");
        quantity.classList.add("quantity");
        quantity.id = `quantity${itemId}`;
        quantity.innerText = cart[itemId];
        adjustItem.appendChild(quantity);

        const addButton = document.createElement("button");
        addButton.classList.add("addItem");
        addButton.classList.add(itemId);
        addButton.innerHTML='<i class="fa-solid fa-square-plus"></i>';
        adjustItem.appendChild(addButton);

        const removeButton = document.createElement("button");
        removeButton.classList.add("removeItem");
        removeButton.classList.add(itemId);
        removeButton.innerHTML='<i class="fa-solid fa-square-minus"></i>';
        adjustItem.appendChild(removeButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteItem");
        deleteButton.classList.add(itemId);
        deleteButton.innerHTML='<i class="fas fa-trash"></i>';
        adjustItem.appendChild(deleteButton);

        cartItem.appendChild(adjustItem);

        const equals = document.createElement("p");
        equals.innerText = "="
        cartItem.appendChild(equals);

        const equivalentPrice = document.createElement("p");
        equivalentPrice.classList.add("equivalentPrice");
        equivalentPrice.id = `equivalentPrice${itemId}`;
        equivalentPrice.innerText = "$" + (items[itemId].price);
        cartItem.appendChild(equivalentPrice);

        cartItems.appendChild(cartItem);
    }
    updateTotal();
}

function adjustItem(e) {
    if (e.target.classList.contains('addItem')) {
        addingItem(e);
    } else if (e.target.classList.contains('removeItem')) {
        removingItem(e);
    } else if (e.target.classList.contains('deleteItem')) {
        deletingItem(e);
    }
}

function addingItem(e) {
    const itemId = e.target.classList[1];
    cart[itemId]++;
    const item = document.querySelector(`#quantity${itemId}`);
    item.innerText = cart[itemId];
    const equivalentPrice = document.querySelector(`#equivalentPrice${itemId}`);
    equivalentPrice.innerText = "$" + cart[itemId] * items[itemId].price;
    updateTotal();
}
  
function removingItem(e) {
    const itemId = e.target.classList[1];
    cart[itemId]--;
    if(cart[itemId] == 0){
        const element = document.getElementById(`ItemID${itemId}`);
        element.remove();
        delete cart[itemId];
    } else {
        const item = document.querySelector(`#quantity${itemId}`);
        item.innerText = cart[itemId];
        const equivalentPrice = document.querySelector(`#equivalentPrice${itemId}`);
        equivalentPrice.innerText = "$" + cart[itemId] * items[itemId].price;
    }
    updateTotal();
}

function deletingItem(e) {
    const itemId = e.target.classList[1];
    delete cart[itemId];
    updateTotal();
    const element = document.getElementById(`ItemID${itemId}`);
    element.remove();
}
  
function updateTotal() {
    let total = 0;

    let cartItemCount = Object.keys(cart);
    for(let i=0; i<cartItemCount.length; i++){
        let itemId = cartItemCount[i];
        let itemCount = cart[itemId];
        let price = items[itemId].price;
        let itemPrice = itemCount * price;
        total += itemPrice;
    }
    
    totalAmount.innerText = "$" + total;
    updateLocal();
}

function updateLocal (){
    // update localStorage
    if(localStorage.getItem('cartList') === null){
        cart = {};
    } else {
        localStorage.setItem('cartList', JSON.stringify(cart));     
    }
}

function getCartItems(){
    if(localStorage.getItem("cartList") === null){
        cart = {};
        localStorage.setItem('cartList', JSON.stringify(cart));
    } else {
        cart = JSON.parse(localStorage.getItem('cartList'));
    }

    let cartItemCount = Object.keys(cart);
    for(let i=0; i<cartItemCount.length; i++){
        let itemId = cartItemCount[i];
        
        // Create a Cart Item
        const cartItem = document.createElement("li");
        cartItem.id = "ItemID" + itemId;
        const item = document.createElement("p");
        item.innerText = items[itemId].name;
        item.classList.add("itemName");
        cartItem.appendChild(item);
        const image = document.createElement("img");
        image.src = items[itemId].image;
        image.alt = items[itemId].name;
        cartItem.appendChild(image);
        const price = document.createElement("p");
        price.classList.add("price");
        price.innerText = "$" + items[itemId].price;
        cartItem.appendChild(price);

        const multiply = document.createElement("p");
        multiply.innerText = "x"
        cartItem.appendChild(multiply);

        const adjustItem = document.createElement("div");
        adjustItem.classList.add("adjustItem");
        const quantity = document.createElement("p");
        quantity.classList.add("quantity");
        quantity.id = `quantity${itemId}`;
        quantity.innerText = cart[itemId];
        adjustItem.appendChild(quantity);

        const addButton = document.createElement("button");
        addButton.classList.add("addItem");
        addButton.classList.add(itemId);
        addButton.innerHTML='<i class="fa-solid fa-square-plus"></i>';
        adjustItem.appendChild(addButton);

        const removeButton = document.createElement("button");
        removeButton.classList.add("removeItem");
        removeButton.classList.add(itemId);
        removeButton.innerHTML='<i class="fa-solid fa-square-minus"></i>';
        adjustItem.appendChild(removeButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteItem");
        deleteButton.classList.add(itemId);
        deleteButton.innerHTML='<i class="fas fa-trash"></i>';
        adjustItem.appendChild(deleteButton);

        cartItem.appendChild(adjustItem);

        const equals = document.createElement("p");
        equals.innerText = "="
        cartItem.appendChild(equals);

        const equivalentPrice = document.createElement("p");
        equivalentPrice.classList.add("equivalentPrice");
        equivalentPrice.id = `equivalentPrice${itemId}`;
        equivalentPrice.innerText = "$" + (items[itemId].price * cart[itemId]);
        cartItem.appendChild(equivalentPrice);

        cartItems.appendChild(cartItem);
    }

    updateTotal();
}