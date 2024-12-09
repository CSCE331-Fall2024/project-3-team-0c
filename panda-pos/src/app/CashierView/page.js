"use client"
import React, { useState, useEffect } from 'react';
import styles from './CashierView.module.css';

/**
   * @description Adds selected menu item to the cart
   * @param {Object} item menu item being added to cart
   * @author Grace Ung
   */
const handleAddItem = (item) => { // add item to the cart
  setCart([...cart, item]);
  setTotalPrice(item.price);
};

/**
   * @description Adds selected menu item to the cart
   * @param {Object} item menu item being added to cart
   * @author Grace Ung
   */
const handleRemoveItem = (index) => {
  const newCart = [...cart];
  newCart.splice(index, 1);
  setCart(newCart);
};
const CashierView = () => {
  // handle adding and removing items to the cart
  const [cart, setCart] = useState([]);
  const [bowlPrice, setBowlPrice] = useState(null);
  const [platePrice, setPlatePrice] = useState(null);
  const [biggerPlatePrice, setBiggerPlatePrice] = useState(null);
  const [appetizersPrice, setAppetizersPrice] = useState(null);
  const [drinkPrice, setDrinkPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  
  

  const calculateTotal = () => {
    return cart
      .filter(item => item.price != null) // Only include items with a price
      .reduce((total, item) => total + item.price, 0); // Sum up the prices
  };


  const fetchPrice = async (itemName, setState) => { // get the price of each product
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/getPrice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: itemName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch price for ${itemName}`);
      }

      const data = await response.json();
      setState(data.price); // Update the corresponding state
    } catch (error) {
      console.error(`An error occurred requesting ${itemName} price:`, error.message);
    }
  };

  async function processCart(orderID) {
    for (let index = 0; index < cart.length; index++) {
      let item = cart[index];
      if (item.name === 'Bowl' || item.name === 'Plate' || item.name === 'Bigger Plate') {
        // TODO check if it orderItem has a menu item already - if so submit order
        if (globalThis.orderItem.hasOwnProperty("menuItem1")) {
          // console.log("Spot A");
          try {
            const orderItemResponse = await fetch("https://project-3-team-0c-n4yn.onrender.com/addCustomerOrderItem", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(globalThis.orderItem)  // FIXME
            });
            const orderItemResult = await orderItemResponse.json();
            if (!orderItemResult.success) {
              console.error(orderItemResult);
            }
          } catch (error) {
            console.error(error.message);
          }
        }


        // globalThis.orderItem = {};
        for (const key in globalThis.orderItem) {
          delete globalThis.orderItem[key];
        }

        // TODO Get PriceID
        let priceID;
        try {
          const priceIDResponse = await fetch("https://project-3-team-0c-n4yn.onrender.com/getPriceID", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "name": item.type })
          });
          const priceIDResult = await priceIDResponse.json();
          if (!priceIDResult.success) {
            console.error(priceIDResult);
          }
          else {
            priceID = priceIDResult.price_ID;
          }
        } catch (error) {
          console.error(error.message);
        }
        // console.log(priceID);
        // TODO Add menu item to order item
        globalThis.orderItem["orderID"] = orderID;
        globalThis.orderItem["priceID"] = priceID;
      }
      else {
        let itemMenuID;
        try {
          const itemIDResponse = await fetch("https://project-3-team-0c-n4yn.onrender.com/getMenuID", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "itemName": item.name })
          });
          const itemIDResult = await itemIDResponse.json();
          // console.log(itemIDResult);
          if (!itemIDResult.success) {
            console.error(itemIDResult);
          }
          else {
            itemMenuID = itemIDResult.menuItemID;
          }
        } catch (error) {
          console.error(error.message);
        }

        // TODO add menu item to orderItem
        if (globalThis.orderItem.hasOwnProperty("menuItem1")) {
          if (globalThis.orderItem.hasOwnProperty("menuItem2")) {
            if (globalThis.orderItem.hasOwnProperty("menuItem3")) {
              if (!globalThis.orderItem.hasOwnProperty("menuItem4")) {
                globalThis.orderItem["menuItem4"] = itemMenuID;
              }
            }
            else {
              globalThis.orderItem["menuItem3"] = itemMenuID;
            }
          }
          else {
            globalThis.orderItem["menuItem2"] = itemMenuID;
          }
        }
        else {
          globalThis.orderItem["menuItem1"] = itemMenuID;
        }
      }
    }
    return globalThis.orderItem;
  };

  const submitOrder = async () => {
    globalThis.orderItem = { "orderID": -1 };
    // TODO: Create empty order
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/createCustomerOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const createResult = await response.json();
      if (!createResult.success) {
        console.error(createResult);
      }
    } catch (error) {
      console.error(error.message);
    }



    // TODO: Get Latest Order_ID
    let orderID;
    try {
      const orderIDResponse = await fetch("https://project-3-team-0c-n4yn.onrender.com/getLatestOrderID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const orderIDResult = await orderIDResponse.json();
      if (!orderIDResult.success) {
        console.error(orderIDResult);
      }
      else {
        orderID = orderIDResult.orderID;
      }
    } catch (error) {
      console.error(error.message);
    }

    // TODO: Add order items to Order

    const processCartResult = await processCart(orderID);


    try {
      const orderItemResponse = await fetch("https://project-3-team-0c-n4yn.onrender.com/addCustomerOrderItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processCartResult)  // FIXME
      });
      const orderItemResult = await orderItemResponse.json();
      if (!orderItemResult.success) {
        console.error(orderItemResult);
      }
    } catch (error) {
      console.error(error.message);
    }

    location.reload();
  };

  // Effect to fetch all prices on component mount
  useEffect(() => {
    fetchPrice("Bowl", setBowlPrice);
    fetchPrice("Plate", setPlatePrice);
    fetchPrice("Bigger Plate", setBiggerPlatePrice);
    fetchPrice("Appetizer", setAppetizersPrice);
    fetchPrice("Drink", setDrinkPrice);
  }, []); // Run once on mount

  // layout and design for the cashier view
  return (
    <div className={styles['container']}>
      <div className={styles['leftPane']}>
        {/* receipt and layout */}
        <h2>Receipt</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.dashes}></span>
                <span className={styles.price}>{item.price}</span>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {/* Display total price */}
        <div className={styles.totalPrice}>
          <button onClick={() => submitOrder()}>Submit</button>

        </div>
      </div>
      <div className={styles['rightPane']}>
        {/* menu buttons and layout */}
        <h2>Menu</h2>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonCombo']} onClick={() => handleAddItem({ name: 'Bowl', price: bowlPrice, type: 'Bowl' })}>Bowl</button>
          <button className={styles['buttonCombo']} onClick={() => handleAddItem({ name: 'Plate', price: platePrice, type: 'Plate' })}>Plate</button>
          <button className={styles['buttonCombo']} onClick={() => handleAddItem({ name: 'Bigger Plate', price: biggerPlatePrice, type: 'Bigger Plate' })}>Bigger Plate</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'White Steamed Rice' })}>White Rice</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Fried Rice' })}>Fried Rice</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Chow Mein' })}>Chow Mein</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Mixed Vegetables' })}>Mixed Vegetables</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Orange Chicken' })}>Orange Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Honey Sesame Chicken' })}>Honey Sesame Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Broccoli Beef' })}>Broccoli Beef</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Kung Pao Chicken' })}>Kung Pao Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Black Pepper Angus Steak' })}>Black Pepper Angus Steak</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'SweetFire Chicken Breast' })}>Sweet Fire Chicken Breast</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Grilled Teriyaki Chicken' })}>Grilled Teriyaki Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Mushroom Chicken' })}>Mushroom Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Beijing Beef' })}>Beijing Beef</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Honey Walnut Shrimp' })}>Honey Walnut Shrimp</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Veggie Spring Roll', price: appetizersPrice })}>Veggie Spring Roll</button>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Chicken Egg Roll', price: appetizersPrice })}>Chicken Egg Roll</button>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Cream Cheese Rangoon', price: appetizersPrice })}>Cream Cheese Rangoon</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Water Bottle', price: drinkPrice })}>Water Bottle</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Sprite', price: drinkPrice })}>Sprite</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Root Beer', price: drinkPrice })}>Root Beer</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Mexican Coke', price: drinkPrice })}>Mexican Coke</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Coke', price: drinkPrice })}>Coke</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Lemonade', price: drinkPrice })}>Lemonade</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Fanta', price: drinkPrice })}>Fanta</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Dr Pepper', price: drinkPrice })}>Dr Pepper</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Diet Coke', price: drinkPrice })}>Diet Coke</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Apple Juice', price: drinkPrice })}>Apple Juice</button>
        </div>
      </div>
    </div>
  );
};

export default CashierView;
