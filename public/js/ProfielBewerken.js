/*
Theme Name: Bewerken van het profiel voor programming project
Author: Zakaria Lamsakam
Email: zakaria.lamsakam@student.ehb.be
Code inspired from https://stackoverflow.com/questions/51851391/fetch-json-data-from-api-javascript/51851521
*/

'use strict'

window.onload = async () => {


    // Hier wordt er gezegd dat de emailfield die gemaakt werd op de html pagina maximum 150 characters kan bevatten.

    document.getElementById("emailField").maxLength = "150";

    // Hier wordt er gezegd dat de password die gemaakt werd op de html pagina maximum 150 characters kan bevatten.

    document.getElementById("password1").maxLength = "50";
    document.getElementById("password2").maxLength = "50";

    // De data wordt gehaald van de getUser. Daaruit gaan we gegevens gebruiken voor het aanvulen van de email, de voornaam en de achternaam op de pagina. 

    getUser().then(value => {
        console.log(value);

        // Hier wordt de gegevens van de klant aangevuld op de pagina door de het gelijk te stellen met de elementen van de pagina.

        document.getElementById("emailField").value = value.email;

        // Hier wordt er een preventDefault gebruikt om de standaartactie van de form te annuleren om de onderstaande deel te laten tonen.

        document.getElementById("form").addEventListener('submit', (event) => {
            event.preventDefault();

            // Hier wordt er voor de emailveld, de oude wachtwoord en de nieuwe wachtwoord: .value gebruikt om de lege velden te kunnen invullen. 

            var email = document.getElementById('emailField').value;
            var password1 = document.getElementById('password1').value;
            var password2 = document.getElementById('password2').value;


            // Als de emailveld leeg blijft na dat er op de knop save werd gedrukt wordt er een popup getoont.

            if (email == "") {
                alert("De email moet ingevuld worden")

                // Als de emailveld meer dan 150 characters bevat na dat er op de knop save werd gedrukt wordt er een popup getoont.

            } else if (email.length > 150) {
                alert("De email mag maximum 150 letters bevatten")
            }

            // Als de wachtwoordveld leeg blijft na dat er op de knop save werd gedrukt wordt er een popup getoont.

            if (password1 == "") {
                alert("Het wachtwoord moet ingevuld worden")
            } else if (password2 == "") {
                alert("Het wachtwoord moet bevestigt worden ")
            } else if (password2.length > 50) {
                alert("Het wachtwoord mag maximum 50 letters bevatten")
            } else {

                // Hier wordt de emailveld van de klant geüpdate en in de database bijgehouden.

                getData(`http://localhost:3000/api/update/customers?set_email=${document.getElementById("emailField").value}&email=${value.email}`).then(async (result) => {

                    // Als het niet gelukt is wordt er een popup getoont.

                    if (!result.success) {
                        alert("Email is niet geüpdate")

                    } else {

                        // Hier wordt er een verificatie gedaan tegevover de oude wachtwoord om dan de nieuwe wachtwoord bij te houden in de database.

                        const passwordChanged = await getData(`http://localhost:3000/api/auth/changePassword?email=${document.getElementById("emailField").value}&password=${document.getElementById("password1").value}&new_password=${document.getElementById("password2").value}`)
                        if (passwordChanged.auth == false) {


                            // Als de oude wachtwoord fout is wordt er een popup getoont

                            alert("Oude wachtwoord is niet correct")
                        } else {


                            // Hier wordt de knop die gemaakt werd in de html pagina gelinkt aan de profiel bewerken pagina wanneer er gedrukt wordt op de knop als alles werkt.
                            // Er wordt ook een popup getoont wanneer alles werkt.

                            alert("Het is gelukt")
                            window.location.href = "http://localhost:3000/profiel/";

                        }
                    }
                });


            }
        });

    });

    async function getData(url) {
        let data = await fetch(url);
        return await data.json();
    };



























}