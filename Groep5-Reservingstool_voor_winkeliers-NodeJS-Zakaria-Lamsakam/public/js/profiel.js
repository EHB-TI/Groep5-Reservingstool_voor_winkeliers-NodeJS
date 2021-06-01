/*
Theme Name:  Profiel pagina voor programming project
Author: Zakaria Lamsakam
Email: zakaria.lamsakam@student.ehb.be
Code inspired from https://stackoverflow.com/questions/51851391/fetch-json-data-from-api-javascript/51851521
*/


window.onload = () => {

    // De data wordt gehaald van de getUser. Daaruit gaan we gegevens gerbuiken voor het aanvulen van de email, de voornaam en de achternaam op de pagina. 

    getUser().then(value => {
        console.log(value);


        // Hier wordt de gegevens van de klant aangevuld op de pagina door het  gelijk te stellen met de elementen van de pagina

        document.getElementById("Email").innerText = value.email;
        document.getElementById("Voornaam").innerText = value.first_name;
        document.getElementById("Achternaam").innerText = value.last_name;

    });

    // Hier wordt de knop die gemaakt werd in de html pagina gelinkt aan de profiel bewerken pagina wanneer er gedrukt wordt op de knop. 

    document.getElementById("button").onclick = function () {
        window.location.href = "http://localhost:3000/profielBewerken/";
    };


}