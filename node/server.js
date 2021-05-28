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
app.get('/api/get/stores', (req, res) => {
    db.query('SELECT * FROM stores', (err, results) => {
        if(err){
            res.send({error: err.sqlMessage});
        }
        else{
            res.send(results);
        }
    });
});
app.get('/api/get/customers', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if(err){
            res.send({error: err.sqlMessage});
        }
        else{
            res.send(results);
        }
    });
});
app.get('/api/get/tickets', (req, res) => {
    db.query('SELECT * FROM tickets', (err, results) => {
        if(err){
            res.send({error: err.sqlMessage});
        }
        else{
            res.send(results);
        }
    });
});
app.get('/api/get/ticket_messages', (req, res) => {
    db.query('SELECT * FROM ticket_messages', (err, results) => {
        if(err){
            res.send({error: err.sqlMessage});
        }
        else{
            res.send(results);
        }
    });
});
app.get('/api/get/special_closures', (req, res) => {
    db.query('SELECT * FROM special_closures', (err, results) => {
        if(err){
            res.send({error: err.sqlMessage});
        }
        else{
            res.send(results);
        }
    });
});
app.get('/api/get/reviews', (req, res) => {
    db.query('SELECT * FROM reviews', (err, results) => {
        if(err){
            res.send({error: err.sqlMessage});
        }
        else{
            res.send(results);
        }
    });
});
app.get('/api/get/reservations', (req, res) => {
    db.query('SELECT * FROM reservations', (err, results) => {
        if(err){
            res.send({error: err.sqlMessage});
        }
        else{
            res.send(results);
        }
    });
});
app.get('/api/get/opening_hours', (req, res) => {
    db.query('SELECT * FROM opening_hours', (err, results) => {
        if(err){
            res.send({error: err.sqlMessage});
        }
        else{
            res.send(results);
        }        
    });
});


app.get('/api/insert/customer', (req, res) => {
    if(!req.query.first_name || !req.query.last_name || !req.query.email || !req.query.password){
        res.send({error: "Er ontbreekt een parameter ! De nodige parameters zijn: first_name, last_name, email en password"});
    }
    else{
        let obj = {
            first_name: req.query.first_name, 
            last_name: req.query.last_name, 
            email: req.query.email,
            password: req.query.password
        };
        db.query('INSERT INTO customers SET ?', obj, (err, result) => {
            if(err) {
                res.send({error: err.sqlMessage});
            }
            else{
                res.send({status: "success"});
            }
        });
    }
});

app.get('/api/insert/review', (req, res) => {
    if(!req.query.store_id || !req.query.customer_id || !req.query.score || !req.query.description){
        res.send({error: "Er ontbreekt een parameter ! De nodige parameters zijn: store_id, customer_id, score en description"});
    }
    else{
        let obj = {
            store_id: req.query.store_id, 
            customer_id: req.query.customer_id, 
            score: req.query.score,
            description: req.query.description
        };
        db.query('INSERT INTO reviews SET ?', obj, (err, result) => {
            if(err) {
                res.send({error: err.sqlMessage});
            }
            else{
                res.send({status: "success"});
            }
        });
    }
});

app.get('/api/insert/reservation', (req, res) => {
    if(!req.query.store_id || !req.query.customer_id || !req.query.date){
        res.send({error: "Er ontbreekt een parameter ! De nodige parameters zijn: store_id, customer_id en date"});
    }
    else{
        let obj = {
            store_id: req.query.store_id, 
            customer_id: req.query.customer_id, 
            date: req.query.date
        };
        db.query('INSERT INTO reservations SET ?', obj, (err, result) => {
            if(err) {
                res.send({error: err.sqlMessage});
            }
            else{
                res.send({status: "success"});
            }
        });
    }
});


app.use('/', express.static('../public/'));

app.listen('3000', () => {
    console.log('Server started');
});