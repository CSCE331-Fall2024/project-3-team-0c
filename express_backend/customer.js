import {app, pool} from 'server.js';  // Get app and database connection from server.js

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
    catch(error) {
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
    catch(error) {
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
        
    //    const priceResult = await pool.query('SELECT price FROM prices WHERE price_id = 1;');
        
        const orderPriceUpdate = {  // Update order cost
            text: 'UPDATE orders SET cost = cost + (SELECT price FROM prices WHERE price_id = 4) WHERE order_id = $1;',
            values: [orderID],
        };

        const orderPriceUpdateResult = await pool.query(orderPriceUpdate);

        // TODO update inventory

        if ((orderItemResult.rowCount == 1) && (orderPriceUpdateResult.rowCount == 1)) {
            res.status(200).json({ success: true, message: 'Order added'});
        }
        else {
            res.status(500).json({ success: false, message: 'Server error' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});