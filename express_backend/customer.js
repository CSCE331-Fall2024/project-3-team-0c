import { app, pool } from 'server.js';  // Get app and database connection from server.js
// const express = require("express");
// const router = express.Router()

app.post('/getLatestOrderID', async (req, res) => {
    try {
        const statement = {
            text: "SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1;",
        }

        const result = await pool.query(statement);
        if (result.rowCount == 1) {  // Only one row should be returned
            // The menu item ID is found in the first returned of the result
            res.status(200).json({ success: true, menuItemID: result.rows[0].order_id });
        } else {  // If rowCount != 1, then something other than the intended operation occurred; therefor error
            res.status(404).json({ success: false, message: 'Failed to get order ID' });
        }
    }
    catch (error) {
        console.error(error);  // Log any errors for debugging purposes
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
                    values: [req.body.menuItem1],
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
                    values: [req.body.menuItem1],
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
                    values: [req.body.menuItem2],
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
                    values: [req.body.menuItem1],
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
                    values: [req.body.menuItem2],
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
                    values: [req.body.menuItem3],
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
                    values: [req.body.menuItem1],
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
                    values: [req.body.menuItem2],
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
                    values: [req.body.menuItem3],
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
                    values: [req.body.menuItem3],
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

// module.exports = router;
