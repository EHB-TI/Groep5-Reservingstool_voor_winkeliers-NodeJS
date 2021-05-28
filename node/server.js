/**
 * Author: Arnaud Faille
 * Inspired with https://github.com/expressjs/express/blob/master/examples/auth/index.js
 */

const express = require('express');
const mysql = require('mysql2');

const app = express();

// Database configuration
const db = mysql.createConnection({
    host: "dt5.ehb.be",
    user: "2021PROGPROJGR5",
    database: "2021PROGPROJGR5",
    password: "8uGuEtMV"
});

// Database connection
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connection etablished !")
});

// Code from https://www.youtube.com/watch?v=EN6Dx22cPRI&ab_channel=TraversyMedia
// Get Data from database
app.get('/api/stores', (req, res) => {
    db.query('SELECT * FROM stores', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/api/customers', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/api/tickets', (req, res) => {
    db.query('SELECT * FROM tickets', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/api/ticket_messages', (req, res) => {
    db.query('SELECT * FROM ticket_messages', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/api/special_closures', (req, res) => {
    db.query('SELECT * FROM special_closures', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/api/reviews', (req, res) => {
    db.query('SELECT * FROM reviews', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/api/reservations', (req, res) => {
    db.query('SELECT * FROM reservations', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});
app.get('/api/opening_hours', (req, res) => {
    db.query('SELECT * FROM opening_hours', (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});


app.use('/', express.static('../public/'));

app.listen('3000', () => {
    console.log('Server started');
});