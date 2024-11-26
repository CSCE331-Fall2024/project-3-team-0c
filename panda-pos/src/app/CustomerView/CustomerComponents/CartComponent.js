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
  // const [ALaCartePrice, setALaCartePricePrice] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(''); // State for selected payment method

  const getPriceFromDB = async (itemName, setState) => {
    try {
      // Get price of an item given the name of the price type (ex: "Bowl")
      const response = await fetch("http://localhost:8080/getPrice", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: itemName }),
      });

      if (!response.ok) { // Throw error if failure to get price
          throw new Error(`Failed to fetch price for ${itemName}`);
      }

      const data = await response.json();
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
}, []);

  // Calculate total price
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      // Only add prices for items that are main selections or A La Carte
      if (item.isMainSelection || item.type === 'A La Carte') {
        total +=
          item.type === 'Bowl'
            ? 8.30
            : item.type === 'Plate'
              ? 9.80
              : item.type === 'Bigger Plate'
                ? 11.30
                : item.type === 'Appetizer'
                  ? 2.00
                  : item.type === 'Drink'
                    ? 2.10
                    : item.type === 'A La Carte'
                      ? 20.00
                      : 0; // Default to 0 if no match
      }
    });
    setTotalPrice(total); // Update the totalPrice state
  }, [cartItems]);

  const handleRemoveItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

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
      <div className={styles['row'] + ' ' + styles['zoom-controls']}>
        <button><Image
          src="/photos/zoom-in.png"
          alt="Zoom In"
          className={styles['zoom-icon']}
          width={24}
          height={24} />
        </button>
        <button>
          <Image
            src="/photos/zoom-out.png"
            alt="Zoom Out"
            className={styles['zoom-icon']}
            width={24}
            height={24} />
        </button>
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
                                  ? '20.00'  // FIXME
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
      <button className={styles.button}>Place Order</button>
    </div>
  );
};

export default CartComponent;
