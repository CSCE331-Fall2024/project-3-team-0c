"use client";
import React, { useState } from "react";
import styles from "./EditPrice_Inventory_Menu.module.css";

function EditMenuAndPrices() {
  // State variables for the menu, price, and inventory items (for display only)
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedPriceItem, setSelectedPriceItem] = useState(null);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

  // Placeholders
  const menuItems = [
    { id: "1", name: "Orange Chicken" },
    { id: "2", name: "Fried Rice" },
  ];

  const priceItems = [
    { id: "1", name: "Bowl", price: 5.00 },
    { id: "2", name: "Plate", price: 8.00 },
  ];

  const inventoryItems = [
    { id: "1", name: "Chicken", quantity: 100 },
    { id: "2", name: "Rice", quantity: 50 },
  ];

  const handleMenuItemSelect = (e) => {
    setSelectedMenuItem(e.target.value);
  };

  const handlePriceItemSelect = (e) => {
    setSelectedPriceItem(e.target.value);
  };

  const handleInventoryItemSelect = (e) => {
    setSelectedInventoryItem(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Database Editor Dashboard</h1>

      <div className={styles.sections}>
        {/* Menu Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Menu Editor</h2>
          <div className={styles.form}>
            <label className={styles.label}>Select Menu Item:</label>
            <select onChange={handleMenuItemSelect} className={styles.select}>
              <option value="">Select...</option>
              {menuItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <label className={styles.label}>Menu ID:</label>
            <input type="text" placeholder="Menu ID" className={styles.input} />

            <label className={styles.label}>Menu Item Name:</label>
            <input type="text" placeholder="Menu Item Name" className={styles.input} />

            <button className={styles.button}>Add Menu Item</button>
            <button className={styles.button}>Edit Menu Item</button>
            <button className={styles.button}>Delete Menu Item</button>
          </div>
        </div>

        {/* Price Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Price Editor</h2>
          <div className={styles.form}>
            <label className={styles.label}>Select Price Item:</label>
            <select onChange={handlePriceItemSelect} className={styles.select}>
              <option value="">Select...</option>
              {priceItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <label className={styles.label}>Price ID:</label>
            <input type="text" placeholder="Price ID" className={styles.input} />

            <label className={styles.label}>Type Name:</label>
            <input type="text" placeholder="Type Name" className={styles.input} />

            <label className={styles.label}>Price:</label>
            <input type="text" placeholder="Price" className={styles.input} />

            <button className={styles.button}>Add Price Item</button>
            <button className={styles.button}>Edit Price Item</button>
            <button className={styles.button}>Delete Price Item</button>
          </div>
        </div>

        {/* Inventory Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Inventory Editor</h2>
          <div className={styles.form}>
            <label className={styles.label}>Select Inventory Item:</label>
            <select onChange={handleInventoryItemSelect} className={styles.select}>
              <option value="">Select...</option>
              {inventoryItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <label className={styles.label}>Inventory ID:</label>
            <input type="text" placeholder="Inventory ID" className={styles.input} />

            <label className={styles.label}>Inventory Name:</label>
            <input type="text" placeholder="Inventory Name" className={styles.input} />

            <label className={styles.label}>Quantity:</label>
            <input type="text" placeholder="Quantity" className={styles.input} />

            <button className={styles.button}>Add Inventory Item</button>
            <button className={styles.button}>Edit Inventory Item</button>
            <button className={styles.button}>Delete Inventory Item</button>
          </div>
        </div>
      </div>

      <footer className = {styles.footer}>
        <a href= "/ManagerView" className = {styles.link}>Back to Manager Dashboard</a>
      </footer> 
    </div>
  );
}

export default EditMenuAndPrices;


