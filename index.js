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

app.post('/fish', (req, res) => {
    const m = req.body.m;
    console.log(m)
    db.query("SELECT * FROM fish WHERE nmonth LIKE ? OR nmonth = 'all'", ["%" + m + "%"],(err, result) => {
        res.send(result)
    })
})

app.post('/fish1', (req, res) => {
    const m = req.body.m;
    db.query("SELECT * FROM fish WHERE smonth LIKE ? OR smonth = 'all'", ["%" + m + "%"],(err, result) => {
        res.send(result)
    })
})

app.post('/bug', (req, res) => {
    const m = req.body.m;
    db.query("SELECT * FROM bug WHERE nmonth LIKE ? OR nmonth = 'all'", ["%" + m + "%"],(err, result) => {
        res.send(result)
    })
})

app.post('/bug1', (req, res) => {
    const m = req.body.m;
    db.query("SELECT * FROM bug WHERE smonth LIKE ? OR smonth = 'all'", ["%" + m + "%"],(err, result) => {
        res.send(result)
    })
})

app.post('/sea', (req, res) => {
    const m = req.body.m;
    db.query("SELECT * FROM sea WHERE nmonth LIKE ? OR nmonth = 'all'", ["%" + m + "%"],(err, result) => {
        res.send(result)
    })
})

app.post('/sea1', (req, res) => {
    const m = req.body.m;
    db.query("SELECT * FROM sea WHERE smonth LIKE ? OR smonth = 'all'", ["%" + m + "%"],(err, result) => {
        res.send(result)
    })
})


app.listen(10000, () => {
    console.log("running on port 3001");
})

app.get('/', (req,res) => {
    res.send("hello world")
})
