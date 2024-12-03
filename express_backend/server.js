
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
app.use(cors({
    origin: ["http://localhost:3000", "https://project-3-team-0c-chix.onrender.com"], // Allow dev and production origins
    credentials: true, // Allow cookies if necessary
  }));

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

// Sales Report
app.post('/salesReport', async (req, res) => {
    const chart = {};
    const { begin, end } = req.body;

    try {
        const sqlStatement = `
            SELECT mi.price_id, COUNT(*) AS item_count
            FROM orders o
            JOIN order_item mi ON o.order_id = mi.order_id
            WHERE EXTRACT(MONTH FROM o.date) BETWEEN $1 AND $2
            GROUP BY mi.price_id;
        `;

        const result = await pool.query(sqlStatement, [begin, end]);

        result.rows.forEach(row => {
            chart[row.price_id] = row.item_count;
        });

        res.json(chart);
    } catch (error) {
        console.error("Error in /salesReport:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Product Usage Chart
app.post('/productUsage', async (req, res) => {
    const { begin, end } = req.body; // Extract begin and end from the request body
    const chart = {}; // Object to store inventory usage data

    try {
        // SQL query to fetch product usage details
        const sqlStatement = `
            SELECT 
                i.name AS inventory_name,
                SUM(m.quantity) AS total_quantity
            FROM orders o
            JOIN order_item mi ON o.order_id = mi.order_id
            JOIN menu_ingredient m ON (
                mi.menu_item1_id = m.menu_id OR
                mi.menu_item2_id = m.menu_id OR
                mi.menu_item3_id = m.menu_id OR
                mi.menu_item4_id = m.menu_id
            )
            JOIN inventory i ON m.inventory_id = i.inventory_id
            WHERE EXTRACT(MONTH FROM o.date) BETWEEN $1 AND $2
            GROUP BY i.name
            ORDER BY i.name;
        `;

        // Execute the query
        const result = await pool.query(sqlStatement, [begin, end]);

        // Process the result set
        result.rows.forEach(row => {
            chart[row.inventory_name] = parseFloat(row.total_quantity);
        });

        // Send the chart data as a JSON response
        res.status(200).json(chart);
    } catch (error) {
        console.error("Error in /productUsage:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// Popular Items
app.get('/managerViewPopularItems', async (req, res) => {
    try {
        const sqlStatement = `
            SELECT 
        menu_item.name AS "dish_name",
        COALESCE(order_counts.order_count, 0) AS "times_ordered"
    FROM menu_item
    LEFT JOIN (
        SELECT 
            menu_item_id,
            COUNT(*) AS order_count
        FROM (
            SELECT menu_item1_id AS menu_item_id FROM order_item
            UNION ALL
            SELECT menu_item2_id AS menu_item_id FROM order_item
            UNION ALL
            SELECT menu_item3_id AS menu_item_id FROM order_item
            UNION ALL
            SELECT menu_item4_id AS menu_item_id FROM order_item
        ) AS all_menu_items
        WHERE menu_item_id IS NOT NULL
        GROUP BY menu_item_id
    ) AS order_counts 
    ON menu_item.menu_id = order_counts.menu_item_id
    ORDER BY "times_ordered" DESC;
        `;

        const result = await pool.query(sqlStatement);

        // Convert rows to a key-value map
        const popularItemsMap = {};
        result.rows.forEach(row => {
            popularItemsMap[row.dish_name] = row.times_ordered;
        });

        // Send the map as a JSON response
        res.status(200).json(popularItemsMap);
    } catch (error) {
        console.error("Error in /managerViewPopularItems:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Monthly sales history 
app.get('/managerViewMonthlySalesHistory', async (req, res) => {
    try {
        // Query to aggregate sales data by month
        const sqlStatement = `
            SELECT 
                EXTRACT(MONTH FROM date) AS month, 
                SUM(cost)::numeric AS total_sales
            FROM orders
            GROUP BY EXTRACT(MONTH FROM date)
            ORDER BY month;
        `;

        const result = await pool.query(sqlStatement);

        // Send the data as an array of objects
        const salesData = result.rows.map(row => ({
            month: row.month,
            total_sales: parseFloat(row.total_sales), // Convert total_sales to a float
        }));

        res.status(200).json(salesData); // Send array
    } catch (error) {
        console.error("Error in /managerViewMonthlySalesHistory:", error.message);
        res.status(500).json({ error: error.message });
    }
});



/*
 * *************************** *
 *                             *
 *    CUSTOMER.JS FUNCTIONS    *
 *                             *
 * ****************************/

// TODO get most recent orderID

app.post('/getLatestOrderID', async (req, res) => {
    try {
        const statement = {
            text: "SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1;",
        }

        const result = await pool.query(statement);
        if (result.rowCount == 1) {  // Only one row should be returned
            // The menu item ID is found in the first returned of the result
            res.status(200).json({ success: true, orderID: result.rows[0].order_id });
        } else {  // If rowCount != 1, then something other than the intended operation occurred; therefor error
            res.status(404).json({ success: false, message: 'Failed to get order ID' });
        }
    }
    catch (error) {
        console.error(error);  // Log any errors for debugging purposes
    }
});

// Given menu item name get the ID for the item
app.post('/getMenuID', async (req, res) => {
    try {
        const statement = {
            text: "SELECT menu_id FROM menu_item WHERE name = $1;",
            values: [req.body.itemName],
        }

        const result = await pool.query(statement);
        if (result.rowCount == 1) {  // Only one row should be returned
            // The menu item ID is found in the first returned of the result
            res.status(200).json({ success: true, menuItemID: result.rows[0].menu_id });
        } else {  // If rowCount != 1, then something other than the intended operation occurred; therefor error
            res.status(404).json({ success: false, message: 'Failed to get menu item ID' });
        }
    }
    catch (error) {
        console.error(error);  // Log any errors for debugging purposes
    }
});

// Create an empty order with cost = 0, and the current time as the date
app.post('/createCustomerOrder', async (req, res) => {
    let dateTime = new Date();  // Get current date
    try {
        const statement = {
            // order_id will be auto-generated and payment type can be left null until known
            text: "INSERT INTO orders(date, cost) VALUES($1, 0);",
            values: [dateTime],
        }
        const result = await pool.query(statement);
        if (result.rowCount == 1) {  // Only one row should be created
            res.status(200).json({ success: true, message: 'Order Created' });
        } else {  // If rowCount != 1, then something other than the intended operation occurred; therefor error
            res.status(404).json({ success: false, message: 'Failed to create order' });
        }
    }
    catch (error) {
        console.error(error);  // Log any errors for debugging purposes
    }

});

// Update order payment type. payment type and order ID should be passed in req body
app.post('/updatePaymentType', async (req, res) => {
    try {
        const statement = {
            text: "UPDATE orders SET payment_type = $1 WHERE order_id = $2;",
            values: [req.body.paymentType, req.body.orderID],
        }
        const result = await pool.query(statement);
        if (result.rowCount == 1) {  // Only one row should be updated
            res.status(200).json({ success: true, message: 'Payment type updated' });
        } else {  // If rowCount != 1, then something other than the intended operation occurred; therefor error
            res.status(404).json({ success: false, message: 'Failed to update payment type' });
        }
    }
    catch (error) {
        console.error(error);  // Log any errors for debugging purposes
    }
});

app.post('/addCustomerOrderItem', async (req, res) => {
    // Record order item details
    var orderID = req.body.orderID;
    var priceID = req.body.priceID;
    var menuItem1 = req.body.menuItem1;

    // Keep track of how many items are in this order for later sql queries
    var numItems = 1;
    // Check if there are more than 1 menu items in the order. If so, save them
    if (req.body.hasOwnProperty('menuItem2')) {
        var menuItem2 = req.body.menuItem2;
        numItems++;
        if (req.body.hasOwnProperty('menuItem3')) {
            var menuItem3 = req.body.menuItem3;
            numItems++;
            if (req.body.hasOwnProperty('menuItem4')) {
                var menuItem4 = req.body.menuItem4;
                numItems++;

            }
        }
    }

    try {  // Insert the new order into the database
        var orderItemQuery;
        if (numItems == 1) {
            orderItemQuery = {
                text: 'INSERT INTO order_item(order_item_id, order_id, price_id, menu_item1_id) VALUES((SELECT MAX(order_item_id)+1 FROM order_item), $1, $2, $3);',
                values: [orderID, priceID, menuItem1],
            };
        }
        else if (numItems == 2) {
            orderItemQuery = {
                text: 'INSERT INTO order_item(order_item_id, order_id, price_id, menu_item1_id, menu_item2_id) VALUES((SELECT MAX(order_item_id)+1 FROM order_item), $1, $2, $3, $4);',
                values: [orderID, priceID, menuItem1, menuItem2],
            };
        }
        else if (numItems == 3) {
            orderItemQuery = {
                text: 'INSERT INTO order_item(order_item_id, order_id, price_id, menu_item1_id, menu_item2_id, menu_item3_id) VALUES((SELECT MAX(order_item_id)+1 FROM order_item), $1, $2, $3, $4, $5);',
                values: [orderID, priceID, menuItem1, menuItem2, menuItem3],
            };
        }
        else if (numItems == 4) {
            orderItemQuery = {
                text: 'INSERT INTO order_item(order_item_id, order_id, price_id, menu_item1_id, menu_item2_id, menu_item3_id, menu_item4_id) VALUES((SELECT MAX(order_item_id)+1 FROM order_item), $1, $2, $3, $4, $5, $6);',
                values: [orderID, priceID, menuItem1, menuItem2, menuItem3, menuItem4],
            };
        }
        const orderItemResult = await pool.query(orderItemQuery);

        const orderPriceUpdate = {  // Update order cost
            text: 'UPDATE orders SET cost = cost + (SELECT price FROM prices WHERE price_id = 4) WHERE order_id = $1;',
            values: [orderID],
        };

        const orderPriceUpdateResult = await pool.query(orderPriceUpdate);

        if (numItems == 1) {
            try {
                const statement = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem1],
                }
        
                const result = await pool.query(statement);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }
        }
        else if (numItems == 2) {
            try {
                const statement = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem1],
                }
        
                const result = await pool.query(statement);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }

            try {
                const statement2 = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem2],
                }
        
                const result = await pool.query(statement2);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt2 = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt2);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }
        }
        else if (numItems == 3) {
            try {
                const statement = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem1],
                }
        
                const result = await pool.query(statement);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }

            try {
                const statement2 = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem2],
                }
        
                const result = await pool.query(statement2);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt2 = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt2);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }
            
            try {
                const statement3 = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem3],
                }
        
                const result = await pool.query(statement3);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt3 = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt3);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }
        }
        else if (numItems == 4) {
            try {
                const statement = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem1],
                }
        
                const result = await pool.query(statement);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }

            try {
                const statement2 = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem2],
                }
        
                const result = await pool.query(statement2);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt2 = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt2);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }
            
            try {
                const statement3 = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem3],
                }
        
                const result = await pool.query(statement3);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt3 = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt3);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }
            try {
                const statement4 = {
                    text: "SELECT inventory_id, quantity FROM menu_ingredient WHERE menu_id = $1;",
                    values: [menuItem4],
                }
        
                const result = await pool.query(statement4);
                for (let i = 0; i < result.rowCount; i++) {
                    const invUpdateStmt4 = {
                        text: "UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2;",
                        values: [result.rows[i].quantity, result.rows[i].inventory_id],
                    }
                    const invResult = await pool.query(invUpdateStmt4);
                }
            }
            catch (error) {
                console.error(error);  // Log any errors for debugging purposes
            }
        }

        if ((orderItemResult.rowCount == 1) && (orderPriceUpdateResult.rowCount == 1)) {
            res.status(200).json({ success: true, message: 'Order added' });
        }
        else {
            res.status(500).json({ success: false, message: 'Server error' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/getPrice', async (req, res) => {
    try {
        const statement = {
            text: "SELECT price FROM prices WHERE name = $1;",
            values: [req.body.name],
        }

        const result = await pool.query(statement);

        if (result.rowCount == 1) {  // Only one row should be returned
            // The menu item ID is found in the first returned of the result
            res.status(200).json({ success: true, price: result.rows[0].price });
        } else {  // If rowCount != 1, then something other than the intended operation occurred; therefor error
            res.status(404).json({ success: false, message: 'Failed to get price' });
        }
    }
    catch (error) {
        console.error(error);  // Log any errors for debugging purposes
    }
});

app.post('/getPriceID', async (req, res) => {
    try {
        const statement = {
            text: "SELECT price_id FROM prices WHERE name = $1;",
            values: [req.body.name],
        }

        const result = await pool.query(statement);

        if (result.rowCount == 1) {  // Only one row should be returned
            // The menu item ID is found in the first returned of the result
            res.status(200).json({ success: true, price_ID: result.rows[0].price_id });
        } else {  // If rowCount != 1, then something other than the intended operation occurred; therefor error
            res.status(404).json({ success: false, message: 'Failed to get price' });
        }
    }
    catch (error) {
        console.error(error);  // Log any errors for debugging purposes
    }
});

// module.exports = router;

////Load reviews for customers
app.get('/ReviewsLoad', async (req, res) => {
    try {
        const query = {  
            text: 'SELECT * FROM reviews;',  // Select all reviews
        };
        
        const result = await pool.query(query);

        res.status(200).json(result.rows);  // Return all reviews
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

//Add review for an item
app.post('/addReview', async (req, res) => {
    try {

        const { rating, review_text, menu_item } = req.body;
        // Construct the query to calculate max id + 1 
        const statement = {
            text: `
                INSERT INTO reviews (review_id, rating, review_text, menu_item)
                VALUES (
                    (SELECT COALESCE(MAX(review_id), 0) + 1 FROM reviews),
                    $1, $2, $3
                );
            `,
            values: [rating, review_text, menu_item],
        };

        const result = await pool.query(statement);

        if (result.rowCount === 1) {  // Confirm a single row was inserted
            res.status(200).json({ success: true, message: 'Review added' });
        } else {  // Handle unexpected cases
            res.status(404).json({ success: false, message: 'Failed to add review' });
        }
    } catch (error) {
        console.error('Error adding review:', error);  // Log error details
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Google Oath2 authentication
// packages are installed in the backend folder
const { OAuth2Client } = require('google-auth-library'); 

const CLIENT_ID = '425214390685-r9egee7vvho2ip1fepevds0i7htide9e.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Verify the token sent by the frontend
async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload; 
}

// Endpoint to verify the user token
app.post('/auth/google', async (req, res) => {
  const token = req.body.token;
  try {
    const userData = await verifyToken(token);
    // Authenticate or register the user in your system
    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

