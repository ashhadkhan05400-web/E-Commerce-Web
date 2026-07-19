console.log(`it is running`);
let profileIcon = document.getElementById("profileMenu");
let profileMenu = document.getElementById("profileMenuList");

profileIcon.addEventListener("click" , function(e){
    e.stopPropagation()
    console.log(`clcik`);
    
    profileMenu.classList.toggle("show");
})

document.addEventListener("click" , (e) => {
    if(!profileMenu.contains(e.target) && !profileIcon.contains(e.target)){
        profileMenu.classList.remove  ("show");
    }
})