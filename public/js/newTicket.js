window.onload = () => {
    let form = document.getElementById("form");
    let inputTitle = document.getElementById("input-title");
    let inputDescription = document.getElementById("input-description");
    let errorDiv = document.getElementById("div-error");

    errorDiv.hidden = true;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if(inputTitle.value.length <= 3){
            errorDiv.hidden = false;
            errorDiv.innerText = "De titel moet langer zijn dan 3 caracters !";
        }
        else if(inputDescription.value.length <= 20){
            errorDiv.hidden = false;
            errorDiv.innerText = "De omschrijving van het probleem moet langer dan 20 caraters zijn !";            
        }
        else {
            insertTicket();
        }
    });

    async function insertTicket(){
        let ticketResult = await getData(`../../api/insert/tickets?customer_id=1&title=${encodeURIComponent(inputTitle.value)}`);
        console.log("if 1");
        console.log(ticketResult);
        if(!ticketResult.success){
            errorDiv.hidden = false;
            errorDiv.innerText = "Er is een error met het toevoegen van de ticket";
            console.log(ticketResult.error? ticketResult.error : "Er is een error met het toevoegen van de ticket");
            return;
        }

        let ticketResultAfterInserted =  await getData(`../../api/get/tickets?customer_id=1&order_by_desc=id&sql_limit=1`);
        console.log("if 2");
        console.log(ticketResultAfterInserted);
        if(ticketResultAfterInserted.error){
            errorDiv.hidden = false;
            errorDiv.innerText = "Er is een error met het terug krijgen van de ticket id";
            console.log(ticketResultAfterInserted.error? ticketResultAfterInserted.error : "Er is een error met het terug krijgen van de ticket id");
            return;
        }

        let ticketMessageResult = await getData(`../../api/insert/ticket_messages?ticket_id=${ticketResultAfterInserted[0].id}&customer_id=1&message=${encodeURIComponent(inputDescription.value)}`);
        console.log("if 3");
        console.log(ticketMessageResult);
        if(!ticketMessageResult.success){
            errorDiv.hidden = false;
            errorDiv.innerText = "Er is een error met het toevoegen van het bericht";
            console.log(ticketMessageResult.error? ticketMessageResult.error : "Er is een error met het toevoegen van het bericht");
            return;
        }
        
        window.location.href = '../';
    }

    async function getData(url){
        let data = await fetch(url);
        return await data.json();
    };
}