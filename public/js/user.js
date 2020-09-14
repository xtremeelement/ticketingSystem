
const userName = document.querySelector(".userName");


// Get current User and display email information.
// Here you can display any User information coming from the server.
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



