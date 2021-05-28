/*
Theme Name: Bewerken van het profiel voor programming project
Author: Zakaria Lamsakam
Email: zakaria.lamsakam@student.ehb.be
*/

'use strict'

window.onload = () => {

    document.getElementById('button').addEventListener('click', checkval);
    document.getElementById("emailField").maxLength = "150";
    document.getElementById("password1").maxLength = "50";
    document.getElementById("password2").maxLength = "50";




    function checkval() {
        var email = document.getElementById('emailField').value;
        var password1 = document.getElementById('password1').value;
        var password2 = document.getElementById('password2').value;

        if (email == "") {
            alert("De email moet ingevuld worden")
        } else if (email.length > 150) {
            alert("De email mag maximum 2 letters bevatten")
        }

        if (password1 == "") {
            alert("Het wachtwoord moet ingevuld worden")
        } else if(password2 == ""){
            alert("Het wachtwoord moet bevestigt worden ")
        }
        else if (password1 != password2) {
            alert("Het wachtwoord is niet gelijk")
        } else if (password1.length > 50 || password2.length > 50) {
           alert("Het wachtwoord is niet gelijk")
        } else {
            return true;
        }


    }


}
