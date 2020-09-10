const userName = document.querySelector(".userName");
const submitTicket = document.querySelector("#submitTicket");
const alertNotification = document.querySelector(".alert_notification");
const shortDesc = document.querySelector("#input_short_description");
const longDesc = document.querySelector("#input_long_description");
const divContainer = document.createElement('div');
const divAlert = document.createElement("div");

fetch("/auth/user")
    .then(response => response.json())
    .then(data => { userName.textContent = data.username[0].toUpperCase() + data.username.substring(1); })
    .catch(err => console.log(err));

const createTicket= async (e) =>{
    e.preventDefault();
    
    const ticketObject ={
        short_description: shortDesc.value,
        long_description: longDesc.value,
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

        shortDesc.value = "";
        longDesc.value = "";
    }    
}

submitTicket.addEventListener("click", createTicket); 