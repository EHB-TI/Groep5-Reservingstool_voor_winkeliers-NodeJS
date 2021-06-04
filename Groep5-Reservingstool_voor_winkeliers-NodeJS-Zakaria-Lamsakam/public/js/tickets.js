/**
 * Author: Arnaud Faille
 */
window.onload = () => {
    getUser().then(user => {
        if(user.auth == false){
            window.location.href = "../login";
        }
        getData(`../api/get/tickets?customer_id=${user.id}`).then(value => {
            let ticketsBody = document.getElementById("tickets");
    
            for(row of value){
                let ticketTr = document.createElement("tr");
                let ticketIdTh = document.createElement("th");
                let ticketTitleTd = document.createElement("td");
                let ticketTitleA = document.createElement("a");
                let ticketStatusTd = document.createElement("td");
    
                ticketIdTh.innerText = row.id;
                ticketTitleA.innerText = row.title;
                ticketTitleA.href = `view?id=${row.id}`;
                ticketTitleA.classList.add("text-dark");
                ticketTitleA.classList.add("text-decoration-none");
                ticketTitleA.classList.add("d-block");
                ticketTitleA.classList.add("w-100");
                ticketStatusTd.innerText = (row.status == 1? "Open": "Closed");
                ticketStatusTd.classList.add(row.status == 1? "table-success": "table-danger");
    
                ticketTr.appendChild(ticketIdTh);
                ticketTitleTd.appendChild(ticketTitleA);
                ticketTr.appendChild(ticketTitleTd);
                ticketTr.appendChild(ticketStatusTd);
                ticketsBody.appendChild(ticketTr);
            }
        }, error => {
            console.log(error);
        });
    });

    async function getData(url){
        let data = await fetch(url);
        return await data.json();
    };
}