console.log(`js is running`);
let block = document.getElementById('trackingDetails')
let dataid = document.getElementById('orderIdInput');
let displayOrderId = document.getElementById("displayOrderId")

document.getElementById("btn").addEventListener("click" , function(){
    localStorage.setItem("Tracking id" , dataid.value)

    if(dataid.value == ""){
        alert("Enter a tracking ID")
    }

    else{
        alert("Order tracked")
        dataid.value = ""
        block.style.display = "block"
        displayOrderId.textContent = localStorage.getItem("Tracking id")
    }
})

