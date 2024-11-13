import {app, pool} from 'server.js';  // Get app and database connection from server.js

app.post('/createCustomerOrder', async (req, res) => {
    let dateTime = new Date();
    const statement = {
        text: "INSERT INTO orders(date, cost) VALUES($1, 0);",
        values: [dateTime],
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
        const result = await pool.query(orderItemQuery);
        
        const priceQuery = {  // Get the price of the newly added order item
            text: 'SELECT price FROM prices WHERE price_id = $1;',
            values: orderID,
        };

        const price = await pool.query(query).price;

        const orderPriceQuery = {  // Update order cost
            text: 'UPDATE orders SET cost = cost + $1::money WHERE order_id = $2',
            values: [price, orderID],
        };

        // TODO update inventory

        // TODO - add better error handling
        res.status(200).json({ success: true, message: 'Order added'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});