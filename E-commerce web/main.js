console.log(`it is running`);
let profileIcon = document.getElementById("profileMenu");
let profileMenu = document.getElementById("profileMenuList");
let signuppage = document.getElementById("write-Sign-name")
signuppage.style.display = "none"
let callloguser = localStorage.getItem("log user")
callloguser = JSON.parse(callloguser)
console.log(callloguser);
let write = document.getElementById("write-log-name")
if (callloguser) {
    write.textContent = callloguser.firstName.toUpperCase();
}
else {
    let write = document.getElementById("write-log-name")
    if (!callloguser) {
        write.style.display = "none"
    }
}

profileIcon.addEventListener("click", function (e) {
    e.stopPropagation()
    console.log(`clcik`);

    profileMenu.classList.toggle("show");
})

document.addEventListener("click", (e) => {
    if (!profileMenu.contains(e.target) && !profileIcon.contains(e.target)) {
        profileMenu.classList.remove("show");
    }
})

let logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {

        let isloggedin = localStorage.getItem("log user") !== null

        if (isloggedin) {
            localStorage.removeItem("log user")
            alert("Logged Out")
            window.location.reload()
        }
        else {
            if (!isloggedin) {
                alert("You are already log out")
            }
        }
    })
}

let isloggedin = localStorage.getItem("log user") !== null

function protectcartandbuy() {
    let cartButtons = document.querySelectorAll(".btn-cart");
    let buyButtons = document.querySelectorAll(".btn-buy");

    cartButtons.forEach((cart) => {
        cart.addEventListener("click", function (e) {
            if (!isloggedin) {
                e.preventDefault()
                alert("You need to log in or sign up first")
                window.location.href = "./auth/login.html"
            }
            else {
                alert("Item added")
            }
        })
    })
    buyButtons.forEach((buynow) => {
        buynow.addEventListener("click", function (e) {
            if (!isloggedin) {
                e.preventDefault
                alert("You need to log in or sign up first")
                window.location.href = "./auth/login.html"
            }

            else {
                alert("Item added check it out")
            }
        })
    })
}

protectcartandbuy()

function getacart() {
    try {
        return JSON.parse(localStorage.getItem("cart")) || []
    }

    catch (error) {
        return []

    }
}
function savecart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function addtocart(product) {
    let cart = getacart();
    let exsiting = cart.find((item) => item.id === product.id)

    if (exsiting) {
        exsiting.qty += 1
    }
    else {
        cart.push({ ...product, qty: 1 })
    }

    savecart(cart)
}

document.querySelectorAll(".btn-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
        let product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            img: btn.dataset.img
        };

        addtocart(product)
        btn.textContent = "Added ✓"
        setTimeout(() => (btn.textContent = "Add to cart") , 1200)
    })
})

document.querySelectorAll(".btn-buy").forEach((btn) => {
    btn.addEventListener("click" , () => {
        let product = {
            id : btn.dataset.id,
            name : btn.dataset.name,
            price : Number(btn.dataset.price),
            img : btn.dataset.img
        }

        addtocart(product)
        window.location.href = "./cart-trackid-pages/cart.html"
    })
})