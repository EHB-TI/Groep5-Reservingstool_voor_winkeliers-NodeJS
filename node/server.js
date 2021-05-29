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


/*async function getTables(){
    const [rows] = await db.execute('show tables');
    return rows;
}

getTables().then((tables) => {
    for(table of tables){
        let tableName = table[Object.keys(table)[0]];
        
        //createGetter(tableName);
    }
});*/
// Defining tables list
db.query('show tables', (err, results) => {
    if (err) throw err;
    for (table of results) {
        let tableName = table[Object.keys(table)[0]];

        // Get data from database
        createGetterLink(tableName);
        createInserterLink(tableName);
        createUpdateLink(tableName);
    }
});

function createGetterLink(tableName){
    app.get(`/api/get/${tableName}`, (req, res) => {
        let whereConverted = convertToWhere2(req.query);
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
            let whereConverted = convertToWhere2(whereObj);
            let setConverted = convertToSet(setObj);
            console.log(setConverted);
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
    /*if (Object.keys(getSettersForUpdate(setObj)).length == 0) {
        let possibleObj = {};
        for (key of Object.keys(setObj)) {
            possibleObj[`set_${key}`] = setObj[key];
        }
        res.send({ error: `Er moet minsens 1 parameter zijn voor om data te veranderen! Je kan kizen tussen: ${Object.keys(possibleObj)}` });
    }
    else {
        let whereConverted = convertToWhere(whereObj);
        db.query(`UPDATE ${tableName} SET ?${whereConverted.where}`, [getSettersForUpdate(setObj), whereConverted.values], (err, result) => {
            if (err) {
                res.send({ error: err.sqlMessage });
            }
            else {
                result.status = "success";
                res.send(result);
            }
        });
    }*/
}

// Get Data from database
/*async function createGetter(tableName){
    app.get(`/api/get/${tableName}`, (req, res) => doSelect(req, res, tableName));
}

async function doSelect(req, res, tableName){
    try {
        let whereObj = convertToWhere2(req.query);
        console.log(whereObj.where);
        console.log(Object.values(whereObj.values));
        const [rows] = await db.execute(`SELECT * FROM ${tableName} ${whereObj.where}`, Object.values(whereObj.values));
        res.send(rows);
    }
}*/

/*
app.get('/api/insert/customer', (req, res) => {
    if (!req.query.first_name || !req.query.last_name || !req.query.email || !req.query.password) {
        res.send({ error: "Er ontbreekt een parameter ! De nodige parameters zijn: first_name, last_name, email en password" });
    }
    else {
        let obj = {
            first_name: req.query.first_name,
            last_name: req.query.last_name,
            email: req.query.email,
            password: req.query.password
        };
        db.query('INSERT INTO customers SET ?', obj, (err, result) => {
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

app.get('/api/insert/review', (req, res) => {
    if (!req.query.store_id || !req.query.customer_id || !req.query.score || !req.query.description) {
        res.send({ error: "Er ontbreekt een parameter ! De nodige parameters zijn: store_id, customer_id, score en description" });
    }
    else {
        let obj = {
            store_id: req.query.store_id,
            customer_id: req.query.customer_id,
            score: req.query.score,
            description: req.query.description
        };
        db.query('INSERT INTO reviews SET ?', obj, (err, result) => {
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

app.get('/api/insert/reservation', (req, res) => {
    if (!req.query.store_id || !req.query.customer_id || !req.query.date) {
        res.send({ error: "Er ontbreekt een parameter ! De nodige parameters zijn: store_id, customer_id en date" });
    }
    else {
        let obj = {
            store_id: req.query.store_id,
            customer_id: req.query.customer_id,
            date: req.query.date
        };
        db.query('INSERT INTO reservations SET ?', obj, (err, result) => {
            if (err) {
                res.send({ error: err.sqlMessage });
            }
            else {
                result.status = "success";
                res.send(result);
            }
        });
    }
});*/

function convertToWhere2(whereObject) {
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

/*function doUpdate(res, tableName, setObj, whereObj) {
    if (Object.keys(getSettersForUpdate(setObj)).length == 0) {
        let possibleObj = {};
        for (key of Object.keys(setObj)) {
            possibleObj[`set_${key}`] = setObj[key];
        }
        res.send({ error: `Er moet minsens 1 parameter zijn voor om data te veranderen! Je kan kizen tussen: ${Object.keys(possibleObj)}` });
    }
    else {
        let whereConverted = convertToWhere(whereObj);
        db.query(`UPDATE ${tableName} SET ?${whereConverted.where}`, [getSettersForUpdate(setObj), whereConverted.values], (err, result) => {
            if (err) {
                res.send({ error: err.sqlMessage });
            }
            else {
                result.status = "success";
                res.send(result);
            }
        });
    }
}

app.get('/api/update/customer', (req, res) => {
    let setObj = {
        first_name: req.query.set_first_name,
        last_name: req.query.set_last_name,
        email: req.query.set_email,
        password: req.query.set_password
    };
    let whereObj = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        email: req.query.email,
        password: req.query.password
    };
    console.log(doUpdate(res, "customers", setObj, whereObj));
});*/


app.use('/', express.static('../public/'));

app.listen('3000', () => {
    console.log('Server started');
});