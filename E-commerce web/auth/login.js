console.log("running js");
let loginPassword = document.getElementById("loginPassword")
let loginEmail = document.getElementById("loginEmail")
let authform = document.querySelector(".auth-form")
let emailtester = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

authform.addEventListener("submit", function (e) {
    e.preventDefault()


    if (!loginEmail.value || !loginPassword.value) {
        alert("Both fields are required")
        return
    }
    if (emailtester.test(loginEmail.value) == false) {
        alert("Enter the correct email address");
        return
    }


    let usersfind = JSON.parse(localStorage.getItem("users")) || []
    console.log("stored users:", usersfind);
    console.log("typed in:", loginEmail.value, loginPassword.value);
    let matchuser = usersfind.find(harry => harry.emails == loginEmail.value && harry.password == loginPassword.value)
    if (matchuser) {
        alert(`Welcome back ${matchuser.firstName}`)
        let loggeduser = matchuser;
        localStorage.setItem("log user" ,JSON.stringify(loggeduser) )
        window.location.href = "../index.html"
    }
    else {
        alert(`Enter a correct email or password`)
    }



})