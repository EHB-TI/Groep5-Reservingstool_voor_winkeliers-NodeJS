/**
 * Author: Arnaud Faille
 * Inspired with https://github.com/expressjs/express/blob/master/examples/auth/index.js
 * and https://www.npmjs.com/package/mysql2
 * and https://www.youtube.com/watch?v=EN6Dx22cPRI&ab_channel=TraversyMedia
 */

const { text } = require('express');
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

// Getting tables list
db.query('show tables', (err, results) => {
    if (err) throw err;
    for (table of results) {
        let tableName = table[Object.keys(table)[0]];

        // Get data from database
        createGetterLink(tableName);

        // Insert data to database
        createInserterLink(tableName);

        // Update data to database
        createUpdateLink(tableName);
    }
});

function createGetterLink(tableName){
    app.get(`/api/get/${tableName}`, (req, res) => {
        let whereConverted = convertToWhere(req.query);
        db.query(`SELECT * FROM ${tableName} ${whereConverted.text}`, whereConverted.values, (err, results) => {
            if(err){
                res.send({error: err.sqlMessage});
            }
            else{
                res.send(results);
            }
        });
    });
}

function createInserterLink(tableName){
    app.get(`/api/insert/${tableName}`, (req, res) => {
        if (Object.keys(req.query).length == 0) {
            db.query(`SELECT * FROM ${tableName}`, (err, results, fields) => {
                if(err){
                    res.send({ error: "Er ontbreekt een parameter ! Een error is gekomen waardoor de lijst van mogelijke parameters niet te krijgen is." });
                }
                else{
                    let fieldsNames = [];
                    for(field of fields){
                        fieldsNames.push(field.name);
                    }
                    res.send({ error: `Er ontbreekt een parameter ! De nodige parameters zijn: ${fieldsNames}`});
                }
            });
        }
        else {
            db.query(`INSERT INTO ${tableName} SET ?`, req.query, (err, result) => {
                if (err) {
                    res.send({ error: err.sqlMessage });
                }
                else {
                    result.status = "success";
                    res.send(result);
                }
            });
        }
    });
}

function createUpdateLink(tableName){
    app.get(`/api/update/${tableName}`, (req, res) => {
        // Split set fields and where fields
        let setObj = {};
        let whereObj = {};
        for(param of Object.keys(req.query)){
            if(param.startsWith("set_")){
                setObj[param] = req.query[param];
            }
            else {
                whereObj[param] = req.query[param];
            }
        }

        if(Object.keys(setObj).length == 0){
            db.query(`SELECT * FROM ${tableName}`, (err, results, fields) => {
                if(err){
                    res.send({ error: "Er is geen parameter voor een colom te veranderen ! Een error is gekomen waardoor de lijst van mogelijke parameters niet te krijgen is." });
                }
                else{
                    let fieldsNames = [];
                    for(field of fields){
                        fieldsNames.push("set_" + field.name);
                    }
                    res.send({ error: `Er is geen parameter voor een colom te veranderen ! De mogelijke parameters zijn: ${fieldsNames}`});
                }
            });
        }
        else{
            let whereConverted = convertToWhere(whereObj);
            let setConverted = convertToSet(setObj);
            db.query(`UPDATE ${tableName} SET ${setConverted.text}${whereConverted.text}`, [setConverted.values, whereConverted.values], (err, result) => {
                if (err) {
                    res.send({ error: err.sqlMessage });
                }
                else {
                    result.status = "success";
                    res.send(result);
                }
            });
        }


    });
}

function convertToWhere(whereObject) {
    let i = 0;
    let text = "";
    let list = [];
    for (key of Object.keys(whereObject)) {
        list.push(whereObject[key]);
        if (i == 0) {
            text += ` WHERE ${key} = ?`;
        }
        else {
            text += ` AND ${key} = ?`;
        }
        i++;
    }
    return { text: text, values: list};
}

function convertToSet(setObject){
    let i = 0;
    let text = "";
    let list = [];
    for (key of Object.keys(setObject)) {
        text += ` ${key.substr(4)} = ?`;
        list.push(setObject[key]);
        if(i != 0 && i < Object.keys(setObject).length){
            text += ",";
        }
        i++;
    }
    return {text: text, values: list}
}

app.use('/', express.static('../public/'));

app.listen('3000', () => {
    console.log('Server started');
});