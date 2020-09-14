
const userName = document.querySelector(".userName");
const inProgressList = document.querySelector("#inprogresslist");
const openedList = document.querySelector("#openedlist");
const closedList = document.querySelector("#closedlist");

// Get current User and display email information.
// Here you can display any User information coming from the server.
fetch("/auth/user")
    .then(response => response.json())
    .then(data => { userName.textContent = data.username[0].toUpperCase() + data.username.substring(1); })
    .catch(err => console.log(err));

fetch("/api/mytickets")
    .then(res => res.json())
    .then(data => sortTickets(data))
    .catch(err => console.log(err));



const displayTickets = (pendingTickets, openedTickets, closedTickets) => {
    
    if(openedTickets.length < 0){
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>No Tickets</td>`;
        openedList.appendChild(newRow);
    }else{
        openedTickets.forEach(item => {
    
            if(item.status == "open"){
                
                let myDate = new Date(item.createdAt);
                let newDate = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
    
                const newRow = document.createElement("tr");
                const ticketNum = document.createElement("th");
                const description = document.createElement("td");
                const date = document.createElement("td");
                const category = document.createElement("td");
                const button = `
                <td><a href="/user/ticket?ticket=${item.ticket_number}" type="button" class="btn btn-light">View Ticket</a></td>
                `
    
                ticketNum.textContent = item.ticket_number;
                description.textContent = item.short_description;
                date.textContent = newDate;
                category.textContent = item.category;
    
                newRow.appendChild(ticketNum);
                newRow.appendChild(description);                
                newRow.appendChild(date);                
                newRow.appendChild(category);
                newRow.innerHTML += button;                
                console.log(openedList);
                openedList.appendChild(newRow);
                
            }
        });
    }
    if(pendingTickets.length < 0){
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>No Tickets</td>`;
        inProgressList.appendChild(newRow);
    }else{
        pendingTickets.forEach(item => {
    
            if(item.status == "open"){
                
                let myDate = new Date(item.createdAt);
                let newDate = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
    
                const newRow = document.createElement("tr");
                const ticketNum = document.createElement("th");
                const description = document.createElement("td");
                const date = document.createElement("td");
                const category = document.createElement("td");
                const button = `
                <td><a href="/user/ticket?ticket=${item.ticket_number}" type="button" class="btn btn-light">View Ticket</a></td>
                `
    
                ticketNum.textContent = item.ticket_number;
                description.textContent = item.short_description;
                date.textContent = newDate;
                category.textContent = item.category;
    
                newRow.appendChild(ticketNum);                
                newRow.appendChild(description);                
                newRow.appendChild(date);                
                newRow.appendChild(category);
                newRow.innerHTML += button;                
                console.log(openedList);
                inProgressList.appendChild(newRow);
                
            }
        });
    }
    if(closedTickets.length < 0){
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>No Tickets</td>`;
        closedList.appendChild(newRow);
    }else{
        closedTickets.forEach(item => {
    
            if(item.status == "open"){
                
                let myDate = new Date(item.createdAt);
                let newDate = (myDate.getMonth() + 2) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
    
                const newRow = document.createElement("tr");
                const ticketNum = document.createElement("th");
                const description = document.createElement("td");
                const date = document.createElement("td");
                const category = document.createElement("td");
                const button = `
                <td><a href="/user/ticket?ticket=${item.ticket_number}" type="button" class="btn btn-light">View Ticket</a></td>
                `
    
                ticketNum.textContent = item.ticket_number;
                description.textContent = item.short_description;
                date.textContent = newDate;
                category.textContent = item.category;
    
                newRow.appendChild(ticketNum);                
                newRow.appendChild(description);                
                newRow.appendChild(date);                
                newRow.appendChild(category);
                newRow.innerHTML += button;                
                console.log(openedList);
                closedList.appendChild(newRow);
                
            }
        });
    }
}

const sortTickets = (data) => {
    let pendingTickets = [];
    let openedTickets = [];
    let closedTickets = [];

    data.forEach(item =>{
        if(item.status=="open"){
            openedTickets.push(item);
        }else if (item.status == "inProgress"){
            pendingTickets.push(item);
        }else{
            closedTickets.push(item);
        }        
    });
    displayTickets(pendingTickets, openedTickets, closedTickets);
}