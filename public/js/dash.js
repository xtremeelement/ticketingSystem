const userName = document.querySelector(".userName");
const divAlertReg = document.createElement("div");
const urlParams = new URLSearchParams(window.location.search);
const rowAlertReg = document.querySelector(".alertAppendReg");

// Get current User and display email information.
// Here you can display any User information coming from the server.
document.addEventListener("DOMContentLoaded", function(event) { 
    fetch("/auth/user")
        .then(response => response.json())
        .then(data => { userName.textContent = data.username[0].toUpperCase() + data.username.substring(1); })
        .catch(err => console.log(err));
    
    if(urlParams){
        const ticketNumber = urlParams.get('ticket');
        const error = urlParams.get('auth');
        console.log(error);
        if(error){

            const message = "You are not authorized";
            divAlertReg.setAttribute("class", "alert alert-danger");
            divAlertReg.setAttribute("role", "alert");
            divAlertReg.textContent = message;
            rowAlertReg.prepend(divAlertReg);
        }
    }
  });