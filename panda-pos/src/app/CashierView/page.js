// // src/views/CashierView.js
// import React from 'react';

// ///lot more work to be done in  this file  --- sprint 2...
// // Front end for Cashier-specific view
// function CashierView() {
//   return (
//     <div>
//       <h2>Cashier Dashboard</h2>
//       <p>This is the cashier view. Here, you can process orders and manage transactions.</p>
//       {/* Cashier-specific features go here */}
//     </div>
//   );
// }

// export default CashierView;
// "use client"
// import React, { useState } from 'react';
// import styles from './CashierView.module.css';

// function CashierView() {
//   // State to keep track of selected items
//   const [selectedItems, setSelectedItems] = useState([]);

//   // List of available items to choose from
//   const items = [
//     'Burger',
//     'Fries',
//     'Soft Drink',
//     'Salad',
//     'Coffee',
//     'Dessert'
//   ];

//   // Handle adding an item to the receipt
//   const handleAddItem = (item) => {
//     setSelectedItems((prevItems) => [...prevItems, item]);
//   };

//   return (
//     <div className={styles.container}>
//       {/* Receipt Section */}
//       <div className={styles.receipt}>
//         <h2>Receipt</h2>
//         {selectedItems.length === 0 ? (
//           <p>No items ordered yet.</p>
//         ) : (
//           <ul>
//             {selectedItems.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Buttons Section */}
//       <div className={styles.buttons}>
//         {items.map((item, index) => (
//           <button 
//             key={index} 
//             className={styles.button} 
//             onClick={() => handleAddItem(item)}
//           >
//             {item}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CashierView;
"use client"
// import React, { useState } from 'react';

// function CashierGUI() {
//   const [cart, setCart] = useState([]);

//   const handleAddItem = (item) => {
//     setCart([...cart, item]);
//   };

//   const handleRemoveItem = (index) => {
//     const newCart = [...cart];
//     newCart.splice(index, 1);
//     setCart(newCart);
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price, 0);
//   };

//   return (
//     <div>
//       <h2>Cashier GUI</h2>

//       {/* Product List */}
//       <div className={styles['receipt']}>
//         {/* Render your product buttons here */}
//         <button onClick={() => handleAddItem({ name: 'Product 1', price: 10 })}>
//           Product 1
//         </button>
//         {/* Add more product buttons as needed */}
//       </div>

//       {/* Cart */}
//       <div>
//         <h3>Cart</h3>
//         <ul>
//           {cart.map((item, index) => (
//             <li key={index}>
//               {item.name} - ${item.price}
//               <button onClick={() => handleRemoveItem(index)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//         <p>Total: ${calculateTotal()}</p>
//       </div>

//       {/* Checkout */}
//       <div>
//         <button>Checkout</button>
//       </div>
//     </div>
//   );
// }

// export default CashierGUI;

import React, { useState } from 'react';
import styles from './CashierView.module.css';

const CashierView = () => {
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


  return (
    <div className={styles['container']}>
      <div className={styles['leftPane']}>
        {/* Left content here, e.g., Order summary or Product categories */}
        <h2>Receipt</h2>
        <h3>Cart</h3>
         <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${calculateTotal()}</p>
      </div>
      <div className={styles['rightPane']}>
        {/* Right content here, e.g., Product details or Checkout section */}
        <h2>Right Pane</h2>
        <div className={styles['buttonRow']}>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'White Rice', price: 10 })}>White Rice</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Fried Rice', price: 10 })}>Fried Rice</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Chow Mein', price: 10 })}>Chow Mein</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Super Greens', price: 10 })}>Super Greens</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Orange Chicken', price: 10 })}>Orange Chicken</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Honey Sesame Chicken', price: 10 })}>Honey Sesame Chicken</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Broccoli Beef', price: 10 })}>Broccoli Beef</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Kung Pao Chicken', price: 10 })}>Kung Pao Chicken</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Black Pepper Angus Steak', price: 10 })}>Black Pepper Angus Steak</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Sweet Fire Chicken Breast', price: 10 })}>Sweet Fire Chicken Breast</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Grilled Teriyaki Chicken', price: 10 })}>Grilled Teriyaki Chicken</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Mushroom Chicken', price: 10 })}>Mushroom Chicken</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Beijing Beef', price: 10 })}>Beijing Beef</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Veggie Spring Roll', price: 10 })}>Veggie Spring Roll</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Chicken Spring Roll', price: 10 })}>Chicken Spring Roll</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Cream Cheese Ragoon', price: 10 })}>Cream Cheese Ragoon</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Water Bottle', price: 10 })}>Water Bottle</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Sprite', price: 10 })}>Sprite</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Root Beer', price: 10 })}>Root Beer</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Mexican Coke', price: 10 })}>Mexican Coke</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Coke', price: 10 })}>Coke</button>
        </div>
        <div className={styles['buttonRow']}>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Lemonade', price: 10 })}>Lemonade</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Fanta', price: 10 })}>Fanta</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Dr Pepper', price: 10 })}>Dr Pepper</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Diet Coke', price: 10 })}>Diet Coke</button>
          <button className={styles['button']} onClick={() => handleAddItem({ name: 'Apple Juice', price: 10 })}>Apple Juice</button>
        </div>
      </div>
    </div>
  );
};

export default CashierView;