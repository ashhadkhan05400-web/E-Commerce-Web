console.log(`it is running`);

let profileIcon = document.getElementById("profileMenu");
let profileMenu = document.getElementById("profileMenuList");
let signuppage = document.getElementById("write-Sign-name");

if (signuppage) {
    signuppage.style.display = "none";
}

let callloguser = localStorage.getItem("log user");
callloguser = callloguser ? JSON.parse(callloguser) : null;
console.log(callloguser);

let write = document.getElementById("write-log-name");
if (write) {
    if (callloguser && callloguser.firstName) {
        write.textContent = callloguser.firstName.toUpperCase();
    } else {
        write.style.display = "none";
    }
}

if (profileIcon && profileMenu) {
    profileIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        profileMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!profileMenu.contains(e.target) && !profileIcon.contains(e.target)) {
            profileMenu.classList.remove("show");
        }
    });
}

let logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        let isloggedin = localStorage.getItem("log user") !== null;

        if (isloggedin) {
            localStorage.removeItem("log user");
            alert("Logged Out");
            window.location.reload();
        } else {
            alert("You are already logged out");
        }
    });
}

function getacart() {
    try {
        return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        return [];
    }
}

function savecart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addtocart(product) {
    let cart = getacart();
    let existing = cart.find((item) => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    savecart(cart);
}

document.querySelectorAll(".btn-cart").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        
        let isloggedin = localStorage.getItem("log user") !== null;

        if (!isloggedin) {
            alert("You need to log in or sign up first");
            window.location.href = "./auth/login.html";
            return; 
        }

        let product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            img: btn.dataset.img
        };

        addtocart(product);
        alert("Item added");
        
        btn.textContent = "Added ✓";
        setTimeout(() => (btn.textContent = "Add to cart"), 1200);
    });
});


document.querySelectorAll(".btn-buy").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        let isloggedin = localStorage.getItem("log user") !== null;

        if (!isloggedin) {
            alert("You need to log in or sign up first");
            window.location.href = "./auth/login.html";
            return; 
        }

        let product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            img: btn.dataset.img
        };

        addtocart(product);
        alert("Item added check it out");
        window.location.href = "./cart-trackid-pages/cart.html";
    });
});