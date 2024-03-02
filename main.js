

// CHART OPEN CLOSE //
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// OPEN CART //
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// CLOSE CART //
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// MAKING ADD TO CART/ CART WORKING JS //
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// MAKING FUNCTION //
function ready() {
    //REMOVE ITEM CART //
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // QUANTITY CHANGE //
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //ADD TO CART
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    loadCartItems();
}

// REMOVE CART ITEM //
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
}

// QUANTITY CHANGE //
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
    updateCartIcon();
}




// ADD CART FUNCTION
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItems();
    updateCartIcon();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i =0; i< cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to cart");
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img" />
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input 
        type="number" 
        name="" 
        id="" 
        value="1" 
        class="cart-quantity"
    />
    </div>
    <!--REMOVE ITEM-->
    <i class="bx bx-trash-alt cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem );
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
    saveCartItems();
    updateCartIcon();
}


// UPDATE TOTAL //
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i =0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("₱", ""))
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    // IF PRICE CONTAIN SOME CENTS
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "₱" + total;
    // SAVE TOTAL TO LOCAL STORAGE
    localStorage.setItem("cartTotal", total);
}

// KEEP ITEM IN CART WHEN PAGE REFRESH WITH LOCALSTORAGE
function saveCartItems() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


// LOADS IN CART
function loadCartItems () {
    var cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i=0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName("cart-box");
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem("cartTotal");
    if(cartTotal) {
        document.getElementsByClassName("total-price")[0].innerText = "₱" + cartTotal;
    }
    updateCartIcon();
}

// QUANTITY IN CART ICON
function updateCartIcon () {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var quantity = 0;

    for (var i=0; i< cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        quantity+= parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector("#cart-icon");
    cartIcon.setAttribute("data-quantity", quantity);
}





var counter = 1;
var intervalId; // To store the interval ID for later clearing

// Function to change the radio button
function changeRadio() {
    var radioId = "radio" + counter;
    var radioElement = document.getElementById(radioId);
    
    if (radioElement) {
        radioElement.checked = true;
        counter++;
        if (counter > 9) {
            counter = 1;
        }
    }
}

// Start the interval only if the first radio button exists
if (document.getElementById("radio1")) {
    changeRadio(); // Set the initial state
    
    intervalId = setInterval(changeRadio, 10000);

    // Stop the interval when the page is not in focus or closed
    window.addEventListener("blur", function () {
        clearInterval(intervalId);
    });

    window.addEventListener("focus", function () {
        // Restart the interval only if it was previously set
        if (!intervalId) {
            changeRadio();
            intervalId = setInterval(changeRadio, 10000);
        }
    });
}





// SEARCH FUNCTION
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list")
    const product = document.querySelectorAll(".product")
    const pname = storeitems.getElementsByTagName("h2")

    for(var i = 0; i < pname.length; ++i){
        let match = product[i].getElementsByTagName('h2')[0];

        if(match) {
            let textvalue = match.textContent || match.innerHTML

            if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
                product[i].style.display = "";
            } else {
                product[i].style.display = "none";
            }
        }
    }
}