const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// const db = require('./db');
const { query } = require('./db');


const app = express();
// app.use(cors());
app.use(express.json());
app.use(cors());


// db.connect();
app.get('/', ()=>{
    console.log("Connected!");
})

app.get('/check', async(req, res)=>{
    res.send({data: "Connected"});
    console.log("first");
})
// Assuming you have a query function in your db.js module

app.get('/getEmp', async (req, res) => {
  const sql = "SELECT *, EXTRACT(YEAR FROM AGE(dob)) AS age FROM employeedetails;";

  try {
    const result = await query(sql);

    // Assuming result.rows is an array of employee data
    res.json(result.rows);
    console.log("Fetch complete");
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Internal Server Error');
  }
});


// app.get('/createTable', async(req,res)=>{
//     const sql = "CREATE TABLE employeedetails (id INT AUTO_INCREMENT PRIMARY KEY, emp_name VARCHAR(255), dob DATE, dept VARCHAR(255), des VARCHAR(255), sal DECIMAL(10,2), address VARCHAR(255));"
//     db.query(sql, (err, data)=>{
//         if(err) res.send(err);
//         res.send(data);
//     })
//     console.log("first");
// })

app.post('/newEmp', async (req, res) => {
    const { name, dept, des, sal, dob, address } = req.body;
  
    try {
      console.log(req.body);
  
      const sql = `
        INSERT INTO employeeDetails (emp_name, dept, dob, des, sal, address)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
  
      const result = await query(sql, [name, dept, dob, des, sal, address]);
  
      // Assuming result.rows is the newly inserted employee data
      res.json(result.rows);
    } catch (error) {
      console.error('Error adding new employee:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

  app.delete('/delEmp', async (req, res) => {
    const { id } = req.body;
  
    try {
      const sql = `DELETE FROM employeeDetails WHERE emp_id = $1;`;
      const result = await query(sql, [id]);
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
})