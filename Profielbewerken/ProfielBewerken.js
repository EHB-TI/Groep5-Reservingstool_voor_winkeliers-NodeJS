/*
Theme Name: Bewerken van het profiel voor programming project
Author: Zakaria Lamsakam
*/

'use strict'

window.onload = () => {
    document.getElementById('button').addEventListener('click',createKlant);
    document.getElementById("exampleInputPassword1").maxLength = "50";
    document.getElementById("emailField").maxLength = "150";


    function gegevens(email,password){
        this.email = email;
        this.password = password;

    }

    function createKlant(){
        let email = document.getElementById('email')
        let password = document.getElementById('exampleInputPassword1');

        let Gegevens = new gegevens(email,password);
    }

   
}   



  /*
    var emailField = document.getElementById("emailField");
    var button = document.getElementById("button");
    var response = document.getElementById("response");

    button.addEventListener("click", function () {
    var email = emailField.value;
    if (validateEmail(email)) {
    response.innerHTML = "Het is valide email";
    } else {
    response.innerHTML = "Het is geen valide email";
    }
    });

    function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());}
    */ 
  
 