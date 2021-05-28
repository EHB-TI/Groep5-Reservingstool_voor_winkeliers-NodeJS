var users = [{mail: "tugce@hotmail.com", password: "123456"},
{mail: "123@hotmail.com", password: "123456"}]

var enteredMail;
var enteredPassword;

var i;

function checkIt() {
    enteredMail = document.getElementById("mail").value;
    enteredPassword = document.getElementById("password").value;

    for(i of users) {
        if((i.mail == enteredMail) && (i.password == enteredPassword))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

function loginConfirmation()
    {
        checkIt();

        if(checkIt())
        {
            //window.open("pageName.html","_self");
            alert("Login successful");
        }
        else
        {
            alert("Incorrect mail or password");
        }
    }
