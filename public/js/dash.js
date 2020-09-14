const userName = document.querySelector(".userName");
const divAlertReg = document.createElement("div");
const urlParams = new URLSearchParams(window.location.search);
const rowAlertReg = document.querySelector(".alertAppendReg");

// Get current User and display email information.
// Here you can display any User information coming from the server.
document.addEventListener("DOMContentLoaded", function(event) { 
    fetch("/auth/user")
    .then(response => response.json())
    .then(data => { 
        userName.textContent = data.username[0].toUpperCase() + data.username.substring(1); 
        isAdmin(data);
    })
    .catch(err => console.log(err));

    const isAdmin = user => {
        if(user.role == "admin"){
            const adminPrepend = document.querySelector(".dropdown-menu");

            const adminLink = document.createElement("a");
            adminLink.setAttribute("href", "/admin");
            adminLink.setAttribute("class", "dropdown-item");
            adminLink.textContent = "Admin";

            // adminPrepend.appendChild(adminLink);
            adminPrepend.insertBefore(adminLink, adminPrepend.firstChild)
        }
}   
    
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