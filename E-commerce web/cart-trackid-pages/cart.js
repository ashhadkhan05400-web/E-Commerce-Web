console.log(`js is running`);

function getcart() {
    let data = localStorage.getItem("cart");

    if (data === null) {
        return []
    }
    try {
        return JSON.parse(data)
    }
    catch (e) {
        return []
    }
}
let box = document.querySelector(".col-lg-8");
function savecart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function rendercart() {
    var cart = getcart();

    box.innerHTML = ""

    if (cart.length == 0) {
        box.innerHTML = "<p>Your cart is empty.</p>";
        updatesummary();
        return
    }

    for (let i = 0; i < cart.length; i++) {
        var item = cart[i];
        let el = document.createElement(`div`)
        el.className = "cart-item";
        el.setAttribute("data-id", item.id)
        el.innerHTML = `
            <div class="item-details">
                <img src="${item.img}" class="item-img" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>RS ${item.price}</p>
                </div>
            </div>
            
            <div class="quantity-controls">
                <button onclick="changeQty('${item.id}', -1)">−</button>
                <span class="qty">${item.qty}</span>
                <button onclick="changeQty('${item.id}', 1)">+</button>
                <button onclick="removeItem('${item.id}')" class="remove-btn">Remove</button>
            </div>
        `;
        box.appendChild(el)


    }

    updatesummary()
}

function updatesummary() {
    let cart = getcart();
    let subtotal = 0;

    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].qty
    }

    var shipping;
    if (cart.length > 0) {
        shipping = 200
    }
    else {
        shipping = 0
    }

    let rows = document.querySelectorAll(".summary-row span:last-child");
    rows[0].textContent = "RS " + subtotal;
    rows[1].textContent = "RS " + shipping
    document.querySelector(".summary-total span:last-child").textContent = "RS " + (subtotal + shipping)
}

function changeQty(id, amount) {
    let cart = getcart();
    var newcart = []

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].qty += amount
        }
        if (cart[i].qty > 0) {
            newcart.push(cart[i])
        }
    }

    savecart(newcart);
    rendercart()
}

function removeItem(id) {
    let cart = getcart()
    let newcart = cart.filter(item => item.id !== id);

    savecart(newcart)
    rendercart()
}

rendercart()



let btnfinal = document.getElementById("btn-final");

if (btnfinal) {
    btnfinal.onclick = function () {
        let cart = getcart();

        if (!cart || cart.length === 0) {
            alert("You need to add some clothes in the cart first");
            window.location.href = "cart.html";
            return;
        }


        let trackid = Math.floor(Math.random() * 9000) + 10;

        alert(`Your Order has been placed successfully!\n\nTracking ID: RL-${trackid}`);

        window.location.href = "track.html";
    };
}