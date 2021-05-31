/**
 * Code inspired from https://www.sitepoint.com/get-url-parameters-with-javascript/
 */
window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const titleH3 = document.getElementById("ticket-title");
    const dateH4 = document.getElementById("ticket-date-created");
    const messagesBody = document.getElementById("messages");
    const answerDiv = document.getElementById("answer-div");
    const statusButton = document.getElementById("button-status");
    const form = document.getElementById("form");
    const messageArea = document.getElementById("ticket-message-text");
    
    let customer_id = 1;

    loadTicket();
    
    async function loadTicket(){
        let ticket = await getData(`../../api/get/tickets?id=${id}&customer_id=${customer_id}`);
        if(ticket.error || ticket.length == 0){
            window.location.href = "../";
            return;
        }

        document.title = ticket[0].title;
        titleH3.innerText = ticket[0].title;
        dateH4.innerText = ticket[0].date_created;
        if(ticket[0].status == 1){
            statusButton.classList.add("btn-danger");
            statusButton.value = "Close ticket";
            statusButton.addEventListener('click', (event) => {
                getData(`../../api/update/tickets?set_status=0&id=${id}&customer_id=${customer_id}`);
                window.location.href = `?id=${id}`;
            });
            answerDiv.hidden = false;
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                
                getData(`../../api/insert/ticket_messages?ticket_id=${id}&customer_id=${customer_id}&message=${messageArea.value}`);
                window.location.href = `?id=${id}`;
            });
        }
        else{
            statusButton.classList.add("btn-success");
            statusButton.value = "Open ticket";
            statusButton.addEventListener('click', (event) => {
                getData(`../../api/update/tickets?set_status=1&id=${id}&customer_id=${customer_id}`);
                window.location.href = `?id=${id}`;
            });
            answerDiv.hidden = true;
        }
        
        
        
        let ticketMessages = await getData(`../../api/get/ticket_messages?ticket_id=${id}`);
        if(ticketMessages.error){
            window.location.href = "../";
            alert("An error occurs when loading messages!");
            return;
        }

        for(message of ticketMessages){

            let messageTr = document.createElement("tr");
            let messageEmailTd = document.createElement("td");
            let messageContentTd = document.createElement("td");
            let messageContentDiv = document.createElement("div");
            let messageDateP = document.createElement("p");
            let messageMessageP = document.createElement("p");

            messageEmailTd.classList.add("col-1");
            if(message.customer_id){
                let customer = await getData(`../../api/get/customers?id=${message.customer_id}&sql_limit=1`);
                messageEmailTd.innerText = customer[0].email;
            }
            else if(message.admin_id){
                let admin = await getData(`../../api/get/admins?id=${message.admin_id}&sql_limit=1`);
                messageEmailTd.innerText = admin[0].email;
                messageTr.classList.add("table-light");
            }
            else {
                messageEmailTd.innerText = "Unknown";
            }
            messageDateP.classList.add("text-end");
            messageDateP.classList.add("fst-italic");
            messageDateP.innerHTML = message.date;
            messageMessageP.innerHTML = message.message;

            messagesBody.appendChild(messageTr);
            messageTr.appendChild(messageEmailTd);
            messageTr.appendChild(messageContentTd);
            messageContentTd.appendChild(messageContentDiv);
            messageContentDiv.appendChild(messageDateP);
            messageContentDiv.appendChild(messageMessageP);
        }
    }

    async function getData(url){
        let data = await fetch(url);
        return await data.json();
    };
}