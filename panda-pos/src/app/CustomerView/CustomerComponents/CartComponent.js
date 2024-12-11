/**
     * @file CartComponent
     * @description sets up format and functionality of the cart component
     * @author Grace Ung, Daniel Fuhrmann
     */
import React, { useState, useEffect } from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';

// cart view and layout for customer view
const CartComponent = ({ message, cartItems, setCartItems }) => {
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [bowlPrice, setBowlPrice] = useState(null);
  const [platePrice, setPlatePrice] = useState(null);
  const [biggerPlatePrice, setBiggerPlatePrice] = useState(null);
  const [appetizersPrice, setAppetizersPrice] = useState(null);
  const [drinkPrice, setDrinkPrice] = useState(null);
  const [ALaCartePrice, setALaCartePrice] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(''); // State for selected payment method

  
  /**
   * @function processCart
   * @description iterates through cartItems adding each item to an order item and submitting to the database
   * @param orderID The ID of the order being created
   * @returns completed order item
   * @author Daniel Fuhrmann
   */
  async function processCart(orderID) {
    for (let index = 0; index < cartItems.length; index++) {
      let item = cartItems[index];
      // TODO: Get menu item id for each item
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
        if (!itemIDResult.success) {
          console.error(itemIDResult);
        }
        else {
          itemMenuID = itemIDResult.menuItemID;
        }
      } catch (error) {
        console.error(error.message);
      }

      if (item.isMainSelection || item.type === 'A La Carte') {
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
        globalThis.orderItem["menuItem1"] = itemMenuID;

        // console.log(JSON.stringify(globalThis.orderItem));
  
  
        // TODO if A la Carte: submit order item
        if (item.type === 'A La Carte') {
          try {
            // console.log("Spot B");
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
      }
      else {
        // TODO add menu item to orderItem
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
      // console.log("Spot D");
      // console.log(globalThis.orderItem);
    }//);
    // console.log("Spot H");
    // console.log(globalThis.orderItem);
    return globalThis.orderItem;
  }

  /**
   * @function placeOrder
   * @description Create a new order and calls processCart to add items to the new order
   * @author Daniel Fuhrmann
   */
  const placeOrder = async () => {
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
    var orderID;
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

    // TODO: Set Payment Type
    var paymentType = paymentMethod
    try {
      const paymentTypeResponse = await fetch("https://project-3-team-0c-n4yn.onrender.com/updatePaymentType", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentType, orderID })
      });
      const paymentTypeResult = await paymentTypeResponse.json();
      if (!paymentTypeResult.success) {
        console.error(paymentTypeResult);
      }
    } catch (error) {
      console.error(error.message);
    }


    // TODO: Add order items to Order
    // let orderItem = { "orderID": -1 };

    
    const processCartResult = await processCart(orderID);

    
    // console.log("Spot b.2");
    // console.log(processCartResult);
    try {
      // console.log("Spot c");
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
    alert("Order Placed!");
  };
  
  /**
   * @function getPriceFromDB
   * @description Sets the price for a given price type in the front end
   * @param {string} itemName name of price type
   * @param {string} setState state to set
   * @author Daniel Fuhrmann
   */
  const getPriceFromDB = async (itemName, setState) => {
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
      console.log(data.price);
      setState(data.price); // Update the corresponding state
    } catch (error) {
      console.error(`An error occurred requesting ${itemName} price:`, error.message);
    }
  };
  
  useEffect(() => {
    getPriceFromDB("Bowl", setBowlPrice);
    getPriceFromDB("Plate", setPlatePrice);
    getPriceFromDB("Bigger Plate", setBiggerPlatePrice);
    getPriceFromDB("Appetizer", setAppetizersPrice);
    getPriceFromDB("Drink", setDrinkPrice);
    getPriceFromDB("A La Carte", setALaCartePrice);
  }, []);
  
  // Calculate total price
  

  useEffect(() => {

    let total = 0;

    for (let index = 0; index < cartItems.length; index++) {
      let item = cartItems[index];
      if (item.isMainSelection || item.type === 'A La Carte') {
        switch (item.type) {
          case 'Bowl':
            total += 8.30;
            break;
          case 'Plate':
            total += 9.70;
            break;
          case 'Bigger Plate':
            total += 11.30;
            break;
          case 'Appetizer':
            total += 1.00;
            break;
          case 'A La Carte':
            total += 20.00;
            break;
          case 'Drink':
            total += 2.10;
            break;
        
          default:
            total += 0;
            break;
        }
      }
    }
    setTotalPrice(total); // Update the totalPrice state
  }, [cartItems]);

  /**
     * @function handleRemoveItem
     * @description Removes unwanted item from cart
     * @param {Object} index item index to be removed from cart
     * @author Grace Ung
     */
  const handleRemoveItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  /**
     * @function handlePaymentChange
     * @description Changes payment type when value changes
     * @param {Object} e action listener
     * @author Grace Ung
     */
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value); // Update the selected payment method
  };

  return (
    <div className={styles['grid-container']}>
      <h2>Receipt</h2>
      {/* Payment Dropdown */}
      <div className={styles.paymentSection}>
        <label htmlFor="paymentOptions">Select Payment Method:</label>
        <select
          id="paymentOptions"
          name="paymentOptions"
          value={paymentMethod}
          onChange={handlePaymentChange}
        >
          <option value="">Select...</option>
          <option value="card">Card</option>
          <option value="apple pay">Apple Pay</option>
          <option value="dining dollars">Dining Dollars</option>
        </select>
      </div>
      <div>

      </div>
      <div className={styles['row'] + ' ' + styles['center-text']}>
        {/* <p>{message}</p> */}
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.dashes}></span>
                  {(item.isMainSelection || item.type === 'A La Carte') && (
                    // Show price and type only for sides
                    <span className={styles.price}>
                      {item.type} - 
                      {item.type === 'Bowl'
                        ? bowlPrice
                        : item.type === 'Plate'
                          ? platePrice
                          : item.type === 'Bigger Plate'
                            ? biggerPlatePrice
                            : item.type === 'Appetizer'
                              ? appetizersPrice
                              : item.type === 'Drink'
                                ? drinkPrice
                                : item.type === 'A La Carte'
                                  ? ALaCartePrice
                                  : 'N/A'}
                    </span>
                  )}
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </li>
            ))}
            <span style={{ fontWeight: 'bold' }}>Total: ${totalPrice.toFixed(2)}</span>
          </ul>

        ) : (
          <p>Your cart is empty</p>
        )}
        
      </div>
      <button className={styles.button} onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default CartComponent;
