/* 
* Theme Name:    Sign up deel voor Programming Project
* Author:        Tugçe Demir <tugce.demir@student.ehb.be>
*
* Examples from: https://www.youtube.com/watch?v=Mn0rdbJPWEo ,
* https://stackoverflow.com/questions/29775797/fetch-post-json-data
*
* 
*/

window.onload = () => {

async function register(event) {
    const rawResponse = await fetch('../api/auth/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            first_name: document.getElementById("name").value, 
            last_name: document.getElementById("surname").value, 
            email: document.getElementById("mail").value, 
            password: document.getElementById("password").value 
        })
    });
    const response = await rawResponse.json();
    

    // set token to localstorage
    localStorage.setItem('token', response.token);
    
    // pagina locatie veranderen
    window.location.href = "../zoekpagina";
}

document.getElementById("form").addEventListener("submit", event => {

    event.preventDefault();
    
    register();
    
    });

}