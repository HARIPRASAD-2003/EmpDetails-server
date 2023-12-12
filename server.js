const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    host: 'database-1.c0pwu6ca2ign.ap-south-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'rootadmin',
    database: 'fullstack',
})

// db.connect();
app.get('/getEmp', async(req,res)=>{
    const sql = "SELECT *, TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age FROM employeeDetails;";
    db.query(sql, (err, data) => {
        if (err) res.send(err);
        res.send(data);
    });
    console.log("fetch Complete");
})

app.get('/createTable', async(req,res)=>{
    const sql = "CREATE TABLE employeedetails (id INT AUTO_INCREMENT PRIMARY KEY, emp_name VARCHAR(255), dob DATE, dept VARCHAR(255), des VARCHAR(255), sal DECIMAL(10,2), address VARCHAR(255));"
    db.query(sql, (err, data)=>{
        if(err) res.send(err);
        res.send(data);
    })
    console.log("first");
})

app.post('/newEmp', async(req, res)=>{
    const {name, dept, des, sal, dob, address} = req.body;
    console.log(req.body);
    const sql = `INSERT INTO employeeDetails (emp_name, dept, dob, des, sal, address) values(?,?,?,?,?,?);`
    db.query(sql, [name, dept, dob, des, sal, address], (err, data)=>{
        if (err) 
        {
            console.log(err);
            res.send(err);
        }
        res.send(data);
    });
})

app.delete('/delEmp', async(req,res)=>{
    const {id} = req.body;
    const sql = `DELETE FROM employeeDetails WHERE emp_id = ?;`;
    db.query(sql, [id], (err, data) => {
        if(err){
            res.send(err);
        }
        res.send(data);
    });
})

app.listen(8080, ()=>{
    console.log("Listening");
})