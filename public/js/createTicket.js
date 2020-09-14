const userName = document.querySelector(".userName");
const submitTicket = document.querySelector("#submitTicket");
const alertNotification = document.querySelector(".alert_notification");
const divContainer = document.createElement('div');
const divAlert = document.createElement("div");
const short_desc = document.querySelector("#input_short_description");
const long_desc = document.querySelector("#input_long_description");
const cat = document.querySelector("#ticketCategory");

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

const createTicket= async (e) =>{
    e.preventDefault();
    const short_description = document.querySelector("#input_short_description").value;
    const long_description = document.querySelector("#input_long_description").value;
    const category = document.querySelector("#ticketCategory").value;
    
    const ticketObject ={
        short_description,
        long_description,
        category
    }
    console.log(ticketObject)
    const response = await fetch("/api/createticket", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticketObject)
    })    
    
    const data = await response.json();
    console.log(data);
    if (data.message){
        const alertMessage = data.message;
        divAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
        divAlert.setAttribute('role', 'alert');
        divAlert.textContent = alertMessage;
        
        const alertButton = document.createElement("button");
        alertButton.setAttribute('type','button');
        alertButton.setAttribute('class','close');
        alertButton.setAttribute('data-dismiss', 'alert');
        alertButton.setAttribute('aria-label', 'Close');
        
    
        const closeAlert = document.createElement("span");
        closeAlert.setAttribute('aria-hidden', 'true');
        closeAlert.innerHTML = "&times;";
    
        alertButton.appendChild(closeAlert);   
        divAlert.appendChild(alertButton);
        alertNotification.append(divAlert);

    }else{
        
        const alertMessage = `Ticket <a href="/user/ticket?ticket=${data.ticket_number}">#${data.ticket_number}</a> created`;
        divAlert.setAttribute("class", "alert alert-success alert-dismissible fade show");
        divAlert.setAttribute('role', 'alert');
        divAlert.innerHTML = alertMessage;
        
        const alertButton = document.createElement("button");
        alertButton.setAttribute('type','button');
        alertButton.setAttribute('class','close');
        alertButton.setAttribute('data-dismiss', 'alert');
        alertButton.setAttribute('aria-label', 'Close');
        
    
        const closeAlert = document.createElement("span");
        closeAlert.setAttribute('aria-hidden', 'true');
        closeAlert.innerHTML = "&times;";
    
        alertButton.appendChild(closeAlert);   
        divAlert.appendChild(alertButton);
        alertNotification.append(divAlert);

        short_desc.value = "";
        long_desc.value = "";
        cat.value = "Choose..."
    }    
}



submitTicket.addEventListener("click", createTicket); 