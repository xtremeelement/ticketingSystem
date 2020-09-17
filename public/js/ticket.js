const userName = document.querySelector(".userName");
const urlParams = new URLSearchParams(window.location.search);
const ticketNumber = urlParams.get('ticket');
const cdTimeline = document.querySelector(".cd-container");
const ticketDetails = '';
const commentArea = document.querySelector("#comment-area");
let ticket_id = '';
let user_id = '';

console.log(ticketNumber);

let user = ''
// Get current User and display email information.
// Here you can display any User information coming from the server.
fetch("/auth/user")
    .then(response => response.json())
    .then(data => { 
        userName.textContent = data.username[0].toUpperCase() + data.username.substring(1); 
        isAdmin(data);
        user = data.username[0].toUpperCase() + data.username.substring(1);
        fetchTicket(user);
        fetchComments();
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
  
const fetchTicket= user => {

    fetch(`/api/ticketdetails/${ticketNumber}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);        
            showDetails(data, user);
        })
        .catch(err => console.log(err));
}


const showDetails = (data, user) => {
    
    ticket_id = data.ticket.id;
    user_id = data.ticket.user_id;
    let myDate = new Date(data.ticket.createdAt);
    let newDate = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();

    const timelineBlock = document.createElement("div");
    timelineBlock.setAttribute('class', 'cd-timeline-block');

    const newTimeline = document.createElement("div");
    newTimeline.setAttribute('class', 'cd-timeline-img cd-picture');
    
    const timelineContent = document.createElement("div");
    timelineContent.setAttribute('class', 'cd-timeline-content');
    
    const title = document.createElement("h2");
    title.textContent = data.ticket.short_description;  
    
    
    const timelineContentInfo = document.createElement("div");
    timelineContentInfo.setAttribute('class', 'timeline-content-info');       
    
    const infoSpan = document.createElement("span");
    infoSpan.setAttribute('class', 'timeline-content-info-title');    
    infoSpan.innerHTML =`
        <i class="fa fa-certificate" aria-hidden="true"></i>
            Submitted By: <br> ${user} <br><br>
            Date Submitted: <br>${newDate}<br><br>
            Ticket#:<br>${data.ticket.ticket_number}<br><br>
            Status: <br>${data.ticket.status.toUpperCase()}
            
     `

    const p = document.createElement("p");
    p.textContent = data.ticket.long_description;    
    
    cdTimeline.appendChild(timelineBlock);
    timelineBlock.appendChild(newTimeline);
    timelineBlock.appendChild(timelineContent)

    timelineContent.appendChild(title); 
    timelineContent.appendChild(timelineContentInfo); 
    timelineContent.appendChild(p); 
    timelineContentInfo.appendChild(infoSpan);   
    
    
}

const fetchComments = () => {
    console.log("Comments Loaded");
}

const submitComment =async () => {
    
    const commentObject = {
        comment: commentArea.value,
        ticket_number: ticketNumber,
        ticket_id,
        user_id
    }

    fetch("/api/submitcomment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObject)
    })
    .then(response => location.reload())    
    .catch(err => console.log(err));    
}
