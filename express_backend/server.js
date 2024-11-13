
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
// Update Employee - Dynamically updates employee fields based on what is provided
app.put('/updateEmployee', async (req, res) => {
    const {
        employeeId, 
        isManager, 
        firstName, 
        lastName, 
        lastLoginTime, 
        payRate, 
        password
    } = req.body;

    try {
        // Start building the SQL update query
        let sqlUpdate = 'UPDATE employee SET ';
        const values = [];
        let valueIndex = 1;

        // Dynamically append fields to the query based on provided values
        if (isManager !== undefined) {
            sqlUpdate += `is_manager = $${valueIndex++}, `;
            values.push(isManager);
        }
        if (firstName) {
            sqlUpdate += `first_name = $${valueIndex++}, `;
            values.push(firstName);
        }
        if (lastName) {
            sqlUpdate += `last_name = $${valueIndex++}, `;
            values.push(lastName);
        }
        if (lastLoginTime) {
            sqlUpdate += `last_login = $${valueIndex++}, `;
            values.push(lastLoginTime); // Assuming lastLoginTime is a string, which will be cast to timestamp in SQL
        }
        if (payRate !== undefined) {
            sqlUpdate += `payrate = $${valueIndex++}, `;
            values.push(payRate);
        }
        if (password) {
            sqlUpdate += `password = $${valueIndex++}, `;
            values.push(password);
        }

        // Remove the last comma and space
        sqlUpdate = sqlUpdate.slice(0, -2); 

        // Add the WHERE condition
        sqlUpdate += ` WHERE employee_id = $${valueIndex};`;
        values.push(employeeId); // Add employeeId as the last value

        // Execute the SQL query
        const result = await pool.query(sqlUpdate, values);

        // Check if any rows were updated
        if (result.rowCount > 0) {
            res.status(200).json({
                success: true,
                message: 'Employee updated successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Employee not found or no changes made'
            });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});
// Delete
app.post('/DeleteEmployee', async (req, res) => {
    const { employee_id } = req.body;

    try {
        const query = {
            text: 'DELETE FROM employee WHERE employee_id = $1 RETURNING *;',  // Delete and return the deleted employee data
            values: [employee_id],
        };

        // Perform the query to delete the employee
        const result = await pool.query(query);

        // If the result returns any rows, it means the deletion was successful
        if (result.rows.length > 0) {
            res.status(200).json({ success: true, message: 'Employee deleted successfully' });
        } else {
            // If no rows were returned, it means the employee_id did not exist in the database
            res.status(404).json({ success: false, message: 'Employee not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Inventory Load - Get only the item names
app.get('/InventoryLoad', async (req, res) => {
    try {
        const query = {  
            text: 'SELECT name FROM inventory;',  // Select only item_name column
        };
        
        const result = await pool.query(query);

        // Return only the item names in the response
        const itemNames = result.rows.map(row => row.name);

        res.status(200).json(itemNames);  // Return array of item names
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Add Inventory - Manually calculate inventory_id
app.post('/InventoryAdd', async (req, res) => {
    const { name, quantity } = req.body;

    try {
        // Start a transaction
        await pool.query('BEGIN');

        // Get the highest inventory_id currently in the database
        const { rows } = await pool.query('SELECT MAX(inventory_id) AS last_inventory_id FROM inventory');
        let inventoryId = 0;

        // If there are existing records, increment the max inventory_id by 1
        if (rows[0].last_inventory_id !== null) {
            inventoryId = rows[0].last_inventory_id + 1;
        } else {
            // If there are no records, start from 1
            inventoryId = 1;
        }

        // Insert the new inventory item
        const insertQuery = {
            text: 'INSERT INTO inventory(inventory_id, name, quantity) VALUES($1, $2, $3) RETURNING *;',
            values: [inventoryId, name, quantity],
        };

        const result = await pool.query(insertQuery);

        // If the insertion was successful, commit the transaction
        if (result.rows.length > 0) {
            await pool.query('COMMIT');
            res.status(200).json({
                success: true,
                message: 'Inventory added successfully',
                data: result.rows[0], // Return the newly inserted inventory data
            });
        } else {
            // If no rows were inserted, something went wrong
            await pool.query('ROLLBACK');
            res.status(500).json({ success: false, message: 'Failed to add inventory' });
        }

    } catch (error) {
        // Rollback the transaction if an error occurred
        await pool.query('ROLLBACK');
        console.error('Error adding inventory:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});
// Update Inventory
app.put('/InventoryUpdate', async (req, res) => {
    const inventoryId = parseInt(req.params.inventoryId);
    const { name, quantity } = req.body;

    try {
        // Start building the SQL update query
        let sqlUpdate = 'UPDATE inventory SET ';
        const queryParams = [];

        // Append fields to the SQL update string based on the request body
        if (name) {
            sqlUpdate += `name = $${queryParams.length + 1}, `;
            queryParams.push(name);
        }
        if (quantity !== undefined) {
            sqlUpdate += `quantity = $${queryParams.length + 1}, `;
            queryParams.push(quantity);
        }

        // Remove the trailing comma and space if needed
        sqlUpdate = sqlUpdate.slice(0, -2);

        // Add the WHERE clause
        sqlUpdate += ` WHERE inventory_id = $${queryParams.length + 1}`;
        queryParams.push(inventoryId);

        // First, check if the inventory_id exists by counting rows
        const countQuery = 'SELECT COUNT(*) FROM inventory';
        const countResult = await pool.query(countQuery);

        const rowCount = parseInt(countResult.rows[0].count);

        if (inventoryId > rowCount) {
            // If inventory_id > rowCount, perform an INSERT instead of UPDATE
            sqlUpdate = 'INSERT INTO inventory(inventory_id, name, quantity) VALUES($1, $2, $3)';
            queryParams.push(inventoryId);
        }

        // Execute the query (either UPDATE or INSERT)
        const result = await pool.query(sqlUpdate, queryParams);

        if (result.rowCount > 0) {
            res.status(200).json({
                success: true,
                message: inventoryId > rowCount ? 'Inventory added successfully' : 'Inventory updated successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Inventory not found or update failed',
            });
        }

    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

