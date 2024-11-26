
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
        sqlUpdate += ` WHERE first_name = $${valueIndex};`;
        values.push(firstName); // Add employeeId as the last value

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
app.put('/DeleteEmployee', async (req, res) => {
    const {firstName} = req.body;

    try {
        const query = {
            text: 'DELETE FROM employee WHERE first_name = $1 RETURNING *;',  // Delete and return the deleted employee data
            values: [firstName],
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
// Inventory Load - Get all inventory for inventory table
app.get('/InventoryLoad', async (req, res) => {
    try {
        const query = {  
            text: 'SELECT * FROM inventory;',  // Select all inventory
        };
        
        const result = await pool.query(query);

        res.status(200).json(result.rows);  // Return all inventory
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

app.post('/InventoryDelete', async (req, res) => {
    const { inventoryId } = req.body;

    try {
        // Start a transaction
        await pool.query('BEGIN');

        // Check if the inventory item exists
        const checkQuery = {
            text: 'SELECT * FROM inventory WHERE inventory_id = $1;',
            values: [inventoryId],
        };

        const checkResult = await pool.query(checkQuery);

        if (checkResult.rows.length === 0) {
            // If the inventory item does not exist, rollback and return an error
            await pool.query('ROLLBACK');
            return res.status(404).json({
                success: false,
                message: 'Inventory item not found',
            });
        }

        // Delete the inventory item
        const deleteQuery = {
            text: 'DELETE FROM inventory WHERE inventory_id = $1 RETURNING *;',
            values: [inventoryId],
        };

        const deleteResult = await pool.query(deleteQuery);

        // If the deletion was successful, commit the transaction
        if (deleteResult.rows.length > 0) {
            await pool.query('COMMIT');
            res.status(200).json({
                success: true,
                message: 'Inventory item deleted successfully',
                data: deleteResult.rows[0], // Return the deleted inventory data
            });
        } else {
            // If no rows were deleted, rollback and return an error
            await pool.query('ROLLBACK');
            res.status(500).json({
                success: false,
                message: 'Failed to delete inventory item',
            });
        }

    } catch (error) {
        // Rollback the transaction if an error occurred
        await pool.query('ROLLBACK');
        console.error('Error deleting inventory item:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


// Update Inventory
app.put('/InventoryUpdate', async (req, res) => {
    const inventoryId = parseInt(req.body.inventoryId); // Extract inventoryId from body
    const { name, quantity } = req.body;

    try {
        // Check if inventoryId exists
        const countQuery = 'SELECT COUNT(*) FROM inventory WHERE inventory_id = $1';
        const countResult = await pool.query(countQuery, [inventoryId]);
        const exists = parseInt(countResult.rows[0].count) > 0;

        if (exists) {
            // Update if inventoryId exists
            const updateQuery = `
                UPDATE inventory
                SET name = COALESCE($1, name), quantity = COALESCE($2, quantity)
                WHERE inventory_id = $3
            `;
            await pool.query(updateQuery, [name, quantity, inventoryId]);
            return res.status(200).json({ success: true, message: 'Inventory updated successfully' });
        } else {
            // Insert if inventoryId does not exist
            const insertQuery = 'INSERT INTO inventory (inventory_id, name, quantity) VALUES ($1, $2, $3)';
            await pool.query(insertQuery, [inventoryId, name, quantity]);
            return res.status(201).json({ success: true, message: 'Inventory added successfully' });
        }
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


// Employee Load - Get all Employee Items for inventory table
app.get('/employeeLoad', async (req, res) => {
    try {
        const query = {  
            text: 'SELECT * FROM employee;',  // Select all inventory
        };
        
        const result = await pool.query(query);

        res.status(200).json(result.rows);  // Return all inventory
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Add Employee
// Function to add a new employee
app.put('/addEmployee', async (req, res) => {
    const {
        isManager,
        firstName,
        lastName,
        lastLoginTime,
        payRate,
        password
    } = req.body;

    try {
        // Step 1: Get the last employee_id from the database
        const getEmployeeIdQuery = 'SELECT MAX(employee_id) AS last_employee_id FROM employee;';
        const result = await pool.query(getEmployeeIdQuery);
        let employeeId = 0;

        if (result.rows.length > 0 && result.rows[0].last_employee_id) {
            employeeId = result.rows[0].last_employee_id + 1;
        } else {
            employeeId = 1; // If there are no employees, start with ID 1
        }

        // Step 2: Insert the new employee into the database
        const insertEmployeeQuery = `
            INSERT INTO employee (employee_id, is_manager, first_name, last_name, last_login, payrate, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
        `;

        const values = [
            employeeId,
            isManager,
            firstName,
            lastName,
            lastLoginTime, // Assuming lastLoginTime is a string formatted as a timestamp (e.g., "YYYY-MM-DD HH:MM:SS")
            payRate,
            password
        ];

        await pool.query(insertEmployeeQuery, values);

        // Step 3: Send a success response
        res.status(201).json({
            success: true,
            message: 'Employee added successfully',
            employeeId: employeeId, // Return the new employee ID
        });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


// Test
app.get('/loadPrice', async (req, res) => {
    try {
        const query = {
            text: "SELECT * FROM prices;"
        }

        const result = await pool.query(query);

        res.status(200).json(result.rows);  //return all prices
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Edit Price
app.put('/editPrice', async (req, res) => {
    const priceId = parseInt(req.body.priceId); 
    const { priceName, priceValue } = req.body;

    try {
        const countQuery = 'SELECT COUNT(*) FROM prices WHERE price_id = $1';
        const countResult = await pool.query(countQuery, [priceId]);
        const exists = parseInt(countResult.rows[0].count) > 0;

        if (exists) {
            const updateQuery = `
                UPDATE prices
                SET name = COALESCE($1, name), price = COALESCE($2, price)
                WHERE price_id = $3
            `;
            await pool.query(updateQuery, [priceName, priceValue, priceId]);
            return res.status(200).json({ success: true, message: 'Prices updated successfully' });
        } else {
            const insertQuery = 'INSERT INTO prices (price_id, name, price) VALUES ($1, $2, $3)';
            await pool.query(insertQuery, [priceId, priceName, priceValue]);
            return res.status(201).json({ success: true, message: 'Price Item added successfully' });
        }
    } catch (error) {
        console.error('Error updating prices:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});
// Menu Load
app.get('/menuLoad', async (req, res) => {
    try {
        const query = {  
            text: 'SELECT * FROM menu_item;',  // Select all inventory
        };
        
        const result = await pool.query(query);

        res.status(200).json(result.rows);  // Return all inventory
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Add Menu Item
app.post('/addMenuItem', async (req, res) => {
    try {
        // Construct the query to calculate max id + 1 
        const statement = {
            text: `
                INSERT INTO menu_item (menu_id, name)
                VALUES (
                    (SELECT COALESCE(MAX(menu_id), 0) + 1 FROM menu_item),
                    $1
                );
            `,
            values: [req.body.name]
        };

        const result = await pool.query(statement);

        if (result.rowCount === 1) {  // Confirm a single row was inserted
            res.status(200).json({ success: true, message: 'Menu item added' });
        } else {  // Handle unexpected cases
            res.status(404).json({ success: false, message: 'Failed to add menu item' });
        }
    } catch (error) {
        console.error('Error adding menu item:', error);  // Log error details
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Delete Menu Item
app.post('/deleteMenuItem', async (req, res) => {
    try {
        // Construct the query to calculate max id + 1 
        const deleteIngredientsStatement = {
            text: `
                DELETE FROM menu_ingredient
                WHERE menu_id = $1;
            `,
            values: [req.body.menu_id],
        };
        await pool.query(deleteIngredientsStatement);
        
        const statement = {
            text: `
                DELETE FROM menu_item
                WHERE menu_id = $1;
            `,
            values: [req.body.menu_id]
        };

        const result = await pool.query(statement);

        if (result.rowCount === 1) {  // Confirm a single row was found
            res.status(200).json({ success: true, message: 'Menu item deleted' });
        } else {  // Handle unexpected cases
            res.status(404).json({ success: false, message: 'Failed to delete menu item' });
        }
    } catch (error) {
        console.error('Error deleting menu item:', error);  // Log error details
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
