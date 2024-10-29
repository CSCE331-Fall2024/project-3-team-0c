import {app, pool} from 'server.js';  // Get app and database connection from server.js

app.get('/customer', async (req, res) => {
    var orderID = req.body.orderID;
    var priceID = req.body.priceID;
    var menuItem1 = req.body.menuItem1;

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
        if (numItems == 1) {
            const query = {
                text: 'INSERT INTO order_item(order_item_id, order_id, price_id, menu_item1_id) VALUES((SELECT MAX(order_item_id)+1 FROM order_item), $1, $2, $3);',
                values: [orderID, priceID, menuItem1],
            };
        }
        // TODO - Handle multiple items per order

        const result = await pool.query(query);
        // TODO - add better error handling
        res.status(200).json({ success: true, message: 'Order added'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});