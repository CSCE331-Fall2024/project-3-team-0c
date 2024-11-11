
// Imports express.js
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// // Imports Client class from PostegreSQL
// const { Client } = require('pg');

// Creating Express app
const app = express();
app.use(express.json()); 
app.use(cors());

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Create pool
const pool = new Pool({  // Connect to PostgreSQL database
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {  // End Server gracefully
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});


//ALL ROUTES DEFINED BELOW

app.get('/', (req,res)=>{
    //console.log("Here");
    res.send("hi");
})

// Endpoint to verify employee login
app.post('/verifyEmployeeLogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = {  // Check employee with id and password exist in database
            text: 'SELECT * FROM employee WHERE employee_id = $1 AND password = $2',
            values: [username, password],
        };
        // query returns rows
        const result = await pool.query(query);

        // sends 200 status if employee login is verified
        // sends 401 status if employee login is not verified
        if (result.rows.length > 0) {  // If Login is correct
            res.status(200).json({ success: true, message: 'Employee login verified' });
        } else {  // Incorrect login
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Endpoint to verify manager login
app.post('/verifyManagerLogin', async (req, res) => {
    const { username, password } = req.body;

    try {

        const query = {  // Check if manager exists in database with given id and password
            text: 'SELECT * FROM employee WHERE is_manager = true AND employee_id = $1 AND password = $2',
            values: [username, password],
        };
        // query returns rows
        const result = await pool.query(query);

        // sends 200 status if manager login is verified
        // sends 401 status if manager login is not verified
        if (result.rows.length > 0) {  // If Manager login is correct
            res.status(200).json({ success: true, message: 'Manager login verified' });
        } else {  // Not authorized to login as a manager
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

