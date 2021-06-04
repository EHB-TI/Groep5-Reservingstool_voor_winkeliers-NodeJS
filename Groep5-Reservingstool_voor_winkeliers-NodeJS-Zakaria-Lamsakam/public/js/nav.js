/**
 * Author: Craig Zoetardt
 */

async function loadNav() {
    let user = await getUser();
    const mainNavdiv = document.getElementById("header");
    
    if (user.auth == false) {

        // Toont inloggen & zoek pagina 
        let navdiv = document.createElement("div");
        let inlogbutton = document.createElement("button");
        let inloglink = document.createElement("a");
       
        navdiv.classList.add("nav_links");
        inloglink.innerText = "Inloggen";
        inloglink.href = "http://localhost:3000/login";

        mainNavdiv.appendChild(navdiv);
       
        inlogbutton.appendChild(inloglink);
        navdiv.appendChild(inlogbutton);
        inlogbutton.appendChild(inloglink);
    }
    

    else {

        //toont uitloggen & winkel zoeken & profiel & contact 
        let navdiv = document.createElement("div");
        let contact = document.createElement("li");
        let profiel = document.createElement("li");
        let contactlink = document.createElement("a");
        let profiellink = document.createElement("a");
        let uitloggenbutton = document.createElement("button");
        let uitloggenlink = document.createElement("a");

        navdiv.classList.add("nav_links");
        profiellink.innerText = "Profiel";
        contactlink.innerText = "Contact";
        contactlink.href= "http://localhost:3000/tickets";
        profiellink.href = "http://localhost:3000/profiel";
        uitloggenlink.innerText = "Uitloggen";
        uitloggenlink.href = "http://localhost:3000/logout";
        contactlink.classList.add("nav_links");
        profiellink.classList.add("nav_links");

        mainNavdiv.appendChild(navdiv);
        navdiv.appendChild(profiel);
        profiel.appendChild(profiellink);
        navdiv.appendChild(contact);
        contact.appendChild(contactlink);
        navdiv.appendChild(uitloggenbutton);
        uitloggenbutton.appendChild(uitloggenlink);
    }
    async function getData(url) {
        let data = await fetch(url);
        return await data.json();
    };

}

loadNav();