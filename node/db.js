const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "dt5.ehb.be",
    user: "2021PROGPROJGR5",
    database: "2021PROGPROJGR5",
    password: "8uGuEtMV"
});

module.exports = db;