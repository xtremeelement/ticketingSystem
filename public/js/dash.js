const userName = document.querySelector(".userName");
const divAlertReg = document.createElement("div");
const urlParams = new URLSearchParams(window.location.search);
const rowAlertReg = document.querySelector(".alertAppendReg");
const inProgressTickets = document.querySelector("#in_progress_tickets");
const openedTickets = document.querySelector("#opened_tickets");
const closedTickets = document.querySelector("#closed_tickets");
const recentTickets = document.querySelector(".recent_tickets");

// Get current User and display email information.
// Here you can display any User information coming from the server.
document.addEventListener("DOMContentLoaded", function(event) { 
    fetch("/auth/user")
    .then(response => response.json())
    .then(data => { 
        userName.textContent = data.username[0].toUpperCase() + data.username.substring(1); 
        isAdmin(data);
        getTickets();
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
            

            const alertButton = document.createElement("button");
            alertButton.setAttribute('type','button');
            alertButton.setAttribute('class','close');
            alertButton.setAttribute('data-dismiss', 'alert');
            alertButton.setAttribute('aria-label', 'Close');
            
        
            const closeAlert = document.createElement("span");
            closeAlert.setAttribute('aria-hidden', 'true');
            closeAlert.innerHTML = "&times;";
        
            alertButton.appendChild(closeAlert);   
            divAlertReg.appendChild(alertButton);
            rowAlertReg.append(divAlertReg);
        }
    }

    const getTickets = () => {
        fetch("/api/mytickets")
        .then(response => response.json())
        .then(data => {
            sortAndDisplayTickets(data);
        })
        .catch(err => console.log(err));
    }

    const sortAndDisplayTickets = data => {
        let myOpenedTickets = [];
        let myInProgTickets = [];
        let myClosedTickets = [];

        data.forEach(ticket => {
            if(ticket.status == "open"){
                myOpenedTickets.push(ticket);
            }else if(ticket.status == "closed"){
                myClosedTickets.push(ticket);
            }else{
                myInProgTickets.push(ticket);
            }
        });

        let openedTicketCount;
        let progressTicketCount;
        let closedTicketCount;

        if(myOpenedTickets.length < 0){
            openedTicketCount = 0;
        }else{
            openedTicketCount = myOpenedTickets.length;

        }

        if(myInProgTickets.length < 0){
            progressTicketCount = 0;
        }else{
            progressTicketCount = myInProgTickets.length;
        }

        if(myClosedTickets.length < 0){
            closedTicketCount = 0;
        }else{
            closedTicketCount = myClosedTickets.length;
        }

        openedTickets.textContent =  openedTicketCount;
        closedTickets.textContent = closedTicketCount;
        inProgressTickets.textContent = progressTicketCount;
        
        displayRecentTickets(data);
    }

    const displayRecentTickets = data => {
        console.log(data)
        let i = 0;
        if(data.length < 1){
            const newTicket = document.createElement("div");
            newTicket.setAttribute("class", "card col-md-12 mb-3");
            newTicket.innerHTML = `
                <div class="card col-md-12 mb-3">
                    <h5 class="card-header">No Tickets</h5>
                    <div class="card-body">
                    <p class="card-text">Your recently created tickets will display here</p>
                    </div>
                </div>
            ` 

            recentTickets.appendChild(newTicket);
        }else{
            while(i < 2){
                let myDate = new Date(data[i].createdAt);
                let newDate = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
                const newTicket = document.createElement("div");
                newTicket.setAttribute("class", "card col-md-12 mb-3");
                newTicket.innerHTML = `
                    <div class="card col-md-12 mb-3">
                        <h5 class="card-header">${data[i].short_description}</h5>
                        <div class="card-body">
                            <h5 class="card-title">${data[i].long_description}</h5>
                            <p class="card-text">Ticket Number: ${data[i].ticket_number}</p>
                            <p class="card-text">Date Submitted: ${newDate}</p>
                            <p class="card-text">Status: ${data[i].status.toUpperCase()}</p>
                            <a href="/user/ticket?ticket=${data[i].ticket_number}" class="btn btn-primary">View Ticket</a>
                        </div>
                    </div>
    
                `
                i++;
                recentTickets.appendChild(newTicket);
            }
        }
    }
  });