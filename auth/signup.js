console.log("its running");
let firstname = document.getElementById("firstName")
let lastname = document.getElementById("lastName")
let email = document.getElementById("signupEmail")
let pass = document.getElementById("signupPassword")
let confirmpass = document.getElementById("confirmPassword")
let check = document.getElementById("terms")
let emailtester = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

document.querySelector(".auth-form").addEventListener("submit", (e) => {
    e.preventDefault()

    if (!firstname.value || !lastname.value || !email.value || !pass.value || !confirmpass.value || !check.checked) {
        alert("All fields are required")
        return;
    }

    if (emailtester.test(email.value) == false) {
        alert('Enter a valid email address');
        return;
    }

    if (pass.value !== confirmpass.value) {
        alert('Password do not match')
        return;
    }

    if (pass.value.length < 5) {
        alert('Enter a strong password')
        return;
    }
    let obj = {
        emails: email.value,
        firstName: firstname.value,
        password: pass.value,
    }
    console.log(obj);
    let user = JSON.parse(localStorage.getItem("users")) || []
    user.push(obj)
    console.log(user);
    localStorage.setItem("users", JSON.stringify(user));



    alert("Account created")
    firstname.value = ""
    lastname.value = ""
    email.value = ""
    pass.value = ""
    confirmpass.value = ""
    check.checked = false
    window.location.href = "login.html"



})

