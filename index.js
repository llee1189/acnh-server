const express = require('express')
const mysql = require('mysql')
const cors = require("cors");

const app = express()

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: 'aws-simplified.cdeemvm07t9l.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Dragon12',
    database: 'test'
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    db.query("SELECT * FROM users WHERE username = ?", [username],(err, result) => {
        if (result[0] != undefined) {
            res.send("BAD")
        } else {
            db.query("INSERT INTO users (username) VALUES (?)", [username], (err, result) => {
            })
            res.send("GOOD")
        }
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
        console.log(result)
        if (result[0] == undefined) {
            res.send("BAD")
        } else {
            res.send("GOOD")
        }
    })
})

app.post('/db-pokemon',  (req, res) => {
    const username = req.body.username;
    const pokemon = req.body.pokemon;
    db.query("SELECT * FROM pokemon WHERE username = ? AND pokemon = ?", [username, pokemon], (err, result) => {
        if (result[0] != undefined) {
            res.send("This user has already seen this pokemon.")
        } else {
            db.query("INSERT INTO pokemon (username, pokemon) VALUES (?, ?)", [username, pokemon], (err, result) => {
                res.send("Adding that the user has seen this pokemon.")
            })
        }
    })
    
})

app.post('/seen-pokemon',  (req, res) => {
    const username = req.body.username;
    const pokemon = req.body.pokemon;
    db.query("SELECT * FROM pokemon WHERE username = ? AND pokemon = ?", [username, pokemon], (err, result) => {
        if (result[0] != undefined) {
            res.send("SEEN")
        } else {
            res.send("NOT SEEN")
        }
    })
})

app.post('/caught-pokemon',  (req, res) => {
    const username = req.body.username;
    const pokemon = req.body.pokemon;
    db.query("UPDATE pokemon SET caught = 1 WHERE username = ? AND pokemon = ? ", [username, pokemon], (err, result) => {
    })
})

app.post('/check-caught-pokemon',  (req, res) => {
    const username = req.body.username;
    const pokemon = req.body.pokemon;
    db.query("SELECT caught FROM pokemon WHERE username = ? AND pokemon = ? ", [username, pokemon], (err, result) => {
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log("running on port 3001");
})

app.get('/', (req,res) => {
    res.send("hello world")
})
