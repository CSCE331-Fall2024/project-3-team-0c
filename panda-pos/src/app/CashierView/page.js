"use client"
import React, { useEffect, useState } from 'react';
import styles from './CashierView.module.css';

const CashierView = () => {
  const [cart, setCart] = useState([]);
  const [bowlPrice, setBowlPrice] = useState(null);
  const [platePrice, setPlatePrice] = useState(null);
  const [biggerPlatePrice, setBiggerPlatePrice] = useState(null);
  const [appetizersPrice, setAppetizersPrice] = useState(null);
  const [drinkPrice, setDrinkPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddItem = (item) => { // add item to the cart
    setCart([...cart, item]);
    setTotalPrice(item.price);
  };

  const handleRemoveItem = (index) => { // remove item from the cart
    const newCart = [...cart];
    newCart.splice(index, 1);
  };

  const calculateTotal = () => {
    return cart
      .filter(item => item.price != null) // Only include items with a price
      .reduce((total, item) => total + item.price, 0); // Sum up the prices
  };
  

  const fetchPrice = async (itemName, setState) => { // get the price of each product
    try {
      const response = await fetch("http://localhost:8080/getPrice", {
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

  // Effect to fetch all prices on component mount
  useEffect(() => {
    fetchPrice("Bowl", setBowlPrice);
    fetchPrice("Plate", setPlatePrice);
    fetchPrice("Bigger Plate", setBiggerPlatePrice);
    fetchPrice("Appetizer", setAppetizersPrice);
    fetchPrice("Drink", setDrinkPrice);
  }, []); // Run once on mount


  return (
    <div className={styles['container']}>
      <div className={styles['leftPane']}>
        {/*left panel: the receipt */}
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
        
  </div>
      </div>
      <div className={styles['rightPane']}>
        {/* menu buttons and layout */}
        <h2>Menu</h2>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonCombo']} onClick={() => handleAddItem({ name: 'Bowl', price: bowlPrice })}>Bowl</button>
          <button className={styles['buttonCombo']} onClick={() => handleAddItem({ name: 'Plate', price: platePrice })}>Plate</button>
          <button className={styles['buttonCombo']} onClick={() => handleAddItem({ name: 'Bigger Plate', price: biggerPlatePrice })}>Bigger Plate</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'White Rice' })}>White Rice</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Fried Rice' })}>Fried Rice</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Chow Mein' })}>Chow Mein</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Super Greens' })}>Super Greens</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Orange Chicken' })}>Orange Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Honey Sesame Chicken' })}>Honey Sesame Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Broccoli Beef' })}>Broccoli Beef</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Kung Pao Chicken' })}>Kung Pao Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Black Pepper Angus Steak' })}>Black Pepper Angus Steak</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Sweet Fire Chicken Breast' })}>Sweet Fire Chicken Breast</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Grilled Teriyaki Chicken' })}>Grilled Teriyaki Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Mushroom Chicken' })}>Mushroom Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Beijing Beef' })}>Beijing Beef</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Veggie Spring Roll', price: appetizersPrice })}>Veggie Spring Roll</button>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Chicken Spring Roll', price: appetizersPrice })}>Chicken Spring Roll</button>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Cream Cheese Ragoon', price: appetizersPrice })}>Cream Cheese Ragoon</button>
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