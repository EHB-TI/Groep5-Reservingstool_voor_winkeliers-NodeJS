/**
 * Author: Arnaud Faille
 * Code from https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
 */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');
const db = require("../db.js");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.get('/changePassword', function (req, res) {

    if(!req.query.email || !req.query.password || !req.query.new_password){
        res.status(500).send("Een parameter is niet aanwezig! De 3 nodige parameters zijn: email, password en new_password.");
    }
    else{
        db.query("SELECT * FROM customers WHERE email = ?", req.query.email, (err, results) => {
            if (err) return res.status(500).send('Error on the server.');
            if (Object.keys(results).length == 0) return res.status(404).send('No user found.');
    
            // check if the password is valid
            var passwordIsValid = bcrypt.compareSync(req.query.password, results[0].password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
            var hashedPassword = bcrypt.hashSync(req.query.new_password, 8);

            db.query("UPDATE customers SET password = ? WHERE email = ?", [hashedPassword, req.query.email], (err, result) => {
                if (err) {
                    res.send({error: err.sqlMessage});
                }
                else {
                    result.success = "true";
                    res.send(result);
                }
            });
        });
    }
});

router.post('/login', function (req, res) {

    db.query("SELECT * FROM customers WHERE email = ?", req.body.email, (err, results) => {
        if (err) return res.status(500).send('Error on the server.');
        if (Object.keys(results).length == 0) return res.status(404).send('No user found.');

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, results[0].password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: results[0].id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
    });

});

router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.post('/register', function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    let user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    };

    db.query("INSERT INTO customers SET ?", user, (err, results) => {
        if (err) return res.status(500).send("There was a problem registering the user`.");

        db.query("SELECT * FROM customers WHERE email = ?", user.email, (err, results) => {
            if (err) return res.status(500).send("There was a problem when getting the user id.");


            // if user is registered without errors
            // create a token
            var token = jwt.sign({ id: results[0].id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });
    });
});

router.get('/me', VerifyToken, function (req, res, next) {
    db.query("SELECT * FROM customers WHERE id = ?", req.userId, (err, results) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (Object.keys(results).length == 0) return res.status(404).send("No user found.");
        res.status(200).send(results[0]);
    });
});

module.exports = router;
