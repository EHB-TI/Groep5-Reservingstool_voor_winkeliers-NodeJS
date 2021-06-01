/* 
* Theme Name:    Login deel voor Programming Project
* Author:        Tugçe Demir <tugce.demir@student.ehb.be>
*
* Examples from: https://www.youtube.com/watch?v=Mn0rdbJPWEo ,
* https://stackoverflow.com/questions/29775797/fetch-post-json-data
*
* 
*/

window.onload = () => {

async function login(event) {
    const rawResponse = await fetch('../api/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: document.getElementById("mail").value, password: document.getElementById("password").value })
    });
    const response = await rawResponse.json();

    if(response.auth){
     // set token to localstorage
    localStorage.setItem('token', response.token);

    // pagina locatie veranderen
    window.location.href = "../";
    } else{
        document.getElementById("error-message").innerHTML = "Er is iets fout gelopen, probeer opnieuw."
    }}

document.getElementById("form").addEventListener("submit", event => {

    event.preventDefault();
    
    login();
    
    });
}
