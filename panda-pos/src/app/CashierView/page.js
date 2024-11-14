"use client"
import React, { useState } from 'react';
import styles from './CashierView.module.css';

const CashierView = () => {
  // handle adding and removing items to the cart
  const [cart, setCart] = useState([]);

  const handleAddItem = (item) => {
    setCart([...cart, item]);
  };

  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

// layout and design for the cashier view
  return (
    <div className={styles['container']}>
      <div className={styles['leftPane']}>
        {/* receipt and layout */}
        <h2>Receipt</h2>
        <h3>Cart</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.dashes}></span>
                <span className={styles.price}>${item.price}</span>
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
        <p>Total: ${calculateTotal()}</p>
      </div>
      <div className={styles['rightPane']}>
        {/* menu buttons and layout */}
        <h2>Right Pane</h2>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'White Rice', price: 10 })}>White Rice</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Fried Rice', price: 10 })}>Fried Rice</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Chow Mein', price: 10 })}>Chow Mein</button>
          <button className={styles['buttonSide']} onClick={() => handleAddItem({ name: 'Super Greens', price: 10 })}>Super Greens</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Orange Chicken', price: 10 })}>Orange Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Honey Sesame Chicken', price: 10 })}>Honey Sesame Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Broccoli Beef', price: 10 })}>Broccoli Beef</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Kung Pao Chicken', price: 10 })}>Kung Pao Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Black Pepper Angus Steak', price: 10 })}>Black Pepper Angus Steak</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Sweet Fire Chicken Breast', price: 10 })}>Sweet Fire Chicken Breast</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Grilled Teriyaki Chicken', price: 10 })}>Grilled Teriyaki Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Mushroom Chicken', price: 10 })}>Mushroom Chicken</button>
          <button className={styles['buttonEntree']} onClick={() => handleAddItem({ name: 'Beijing Beef', price: 10 })}>Beijing Beef</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Veggie Spring Roll', price: 10 })}>Veggie Spring Roll</button>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Chicken Spring Roll', price: 10 })}>Chicken Spring Roll</button>
          <button className={styles['buttonApp']} onClick={() => handleAddItem({ name: 'Cream Cheese Ragoon', price: 10 })}>Cream Cheese Ragoon</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Water Bottle', price: 10 })}>Water Bottle</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Sprite', price: 10 })}>Sprite</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Root Beer', price: 10 })}>Root Beer</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Mexican Coke', price: 10 })}>Mexican Coke</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Coke', price: 10 })}>Coke</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Lemonade', price: 10 })}>Lemonade</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Fanta', price: 10 })}>Fanta</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Dr Pepper', price: 10 })}>Dr Pepper</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Diet Coke', price: 10 })}>Diet Coke</button>
          <button className={styles['buttonDrink']} onClick={() => handleAddItem({ name: 'Apple Juice', price: 10 })}>Apple Juice</button>
        </div>
      </div>
    </div>
  );
};

export default CashierView;
