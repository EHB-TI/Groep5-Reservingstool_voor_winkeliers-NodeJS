/*
Theme Name:  Profiel pagina voor programming project
Author: Zakaria Lamsakam
Email: zakaria.lamsakam@student.ehb.be
*/


window.onload = () => {

   getUser().then(value => {
  console.log(value);

  
   document.getElementById("Email").innerText = value.email;
   document.getElementById("Voornaam").innerText = value.first_name;
   document.getElementById("Achternaam").innerText = value.last_name;

   });

   document.getElementById("button").onclick = function () {
    location.href = "http://localhost:3000/profielBewerken/";
};


}
