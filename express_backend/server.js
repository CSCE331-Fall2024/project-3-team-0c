// Imports express.js
const express = require('express');
// // Imports Client class from PostegreSQL
// const { Client } = require('pg');

// Creating Express app
const app = express();
// Set port that server runs on and that will be used to make HTTP requests to the server
const port = 3001;
// Middleware for parsing JSON requests -- makes it easier to deal wih JSON data
app.use(express.json()); 

// // PostgreSQL client setup
// const client = new Client({
//     user: 'team_0c',
//     host: 'csce-315-db.engr.tamu.edu',
//     database: 'team_0c_db',
//     password: 'magmar56',
//     port: 5432,
// });
// Create pool
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

// // Connect to PostgreSQL
// client.connect()
//     .then(() => console.log('Connected to PostgreSQL'))
//     .catch(err => console.error('Connection error', err.stack));

// Endpoint to verify employee login
app.post('/api/verifyEmployeeLogin', async (req, res) => {
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
app.post('/api/verifyManagerLogin', async (req, res) => {
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

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

