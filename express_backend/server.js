// Imports express.js
const express = require('express');
// Imports Client class from PostegreSQL
const { Client } = require('pg');
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
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Connect to PostgreSQL
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// Endpoint to verify employee login
app.post('/api/verifyEmployeeLogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = {
            text: 'SELECT * FROM employee WHERE employee_id = $1 AND password = $2',
            values: [username, password],
        };
        const result = await client.query(query);

        if (result.rows.length > 0) {
            res.status(200).json({ success: true, message: 'Employee login verified' });
        } else {
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
        const query = {
            text: 'SELECT * FROM employee WHERE is_manager = true AND employee_id = $1 AND password = $2',
            values: [username, password],
        };
        const result = await client.query(query);

        if (result.rows.length > 0) {
            res.status(200).json({ success: true, message: 'Manager login verified' });
        } else {
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

