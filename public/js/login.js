/* 
* Theme Name:    Login deel voor Programming Project
* Author:        Tugçe Demir <tugce.demir@student.ehb.be>
*
* Examples from: https://www.youtube.com/watch?v=Mn0rdbJPWEo
*
* gebruik gemaakt van de bovenste link om te kunnen connecteren met de database 
* maar zelf aanpassingen toegevoegt aan de code 
*
*/

const mysql  = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/")

const connection = mysql.createConnection({
    host: "dt5.ehb.be",
    user: "2021PROGPROJGR5",
    database: "2021PROGPROJGR5",
    password: "8uGuEtMV"
});

//connecteren met de database
connection.connect(function(error) {
    if(error) throw error
    else console.log("Connected to the database successfully :)")
});

app.get("../",function(req,res){
    res.sendFile(__dirname +"login/index.html")

});

app.post("../",encoder,function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    connection.query("SELECT * FROM customers WHERE email = ? AND password = ?", [email,password], function(error, results, fields){
        if(results.length > 0) {
            res.redirect("zoekpagina/index.html");
        }
        else{
            res.redirect("/");
        }
        res.end();
    })
})

//als de login succesvol is..
app.get("../",function(req, res){
    res.sendFile(__dirname + "zoekpagina/index.html");
})

//app poort
app.listen(3000);