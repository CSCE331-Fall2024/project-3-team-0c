"use client";
import React, { useState, useEffect } from "react";
import styles from "./EditPrice_Inventory_Menu.module.css";

/*
 * Edit Menu, Prices, and Inventory in this frontend interface
 */
function EditMenuAndPrices() {
  // State variables
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedPriceItem, setSelectedPriceItem] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const [menuItems, setMenuItems] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuId, setMenuId] = useState("");

  const [priceItems, setPriceItems] = useState([]);
  const [priceName, setPriceName] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const [inventoryId, setInventoryId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [Menumessage, setMenuMessage] = useState("");
  const [Inventorymessage, setInventoryMessage] = useState("");

  // Load menu items
  const loadMenu = async () => {
    try {
      const response = await fetch("http://localhost:8080/menuLoad", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching menu data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMenu = async () => {
      const result = await loadMenu();
      setMenuItems(Array.isArray(result) ? result : []);
    };
    fetchMenu();
  }, []);

  const handleMenuItemSelect = (e) => {
    const menuItemId = e.target.value;
    const menuItem = menuItems.find(
      (item) => item.menu_id === parseInt(menuItemId)
    );
    setSelectedMenuItem(menuItem);
    if (menuItem) {
      setMenuId(menuItem.menu_id);
      setMenuName(menuItem.name);
    }
  };

  const addMenu = async () => {
    try {
      const response = await fetch("http://localhost:8080/addMenuItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: menuName }),
      });
      const data = await response.json();
      if (data.success) {
        setMenuMessage("New Menu Item Added");
        window.location.reload();
      }
    } catch (error) {
      setMenuMessage("An error occurred. Please try again.");
    }
  };

  const deleteMenu = async () => {
    try {
      const response = await fetch("http://localhost:8080/deleteMenuItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menu_id: parseInt(menuId) }),
      });
      const data = await response.json();
      if (data.success) {
        setMenuMessage("Menu Item Deleted");
        window.location.reload();
      }
    } catch (error) {
      setMenuMessage("An error occurred. Please try again.");
    }
  };

  // Load inventory items
  const loadInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/InventoryLoad", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInventory = async () => {
      const result = await loadInventory();
      setInventoryItems(Array.isArray(result) ? result : []);
    };
    fetchInventory();
  }, []);

  const handleInventorySelect = (e) => {
    const inventoryItemId = e.target.value;
    const inventoryItem = inventoryItems.find(
      (item) => item.inventory_id === parseInt(inventoryItemId)
    );
    setSelectedInventory(inventoryItem);
    if (inventoryItem) {
      setInventoryId(inventoryItem.inventory_id);
      setName(inventoryItem.name);
      setQuantity(inventoryItem.quantity);
    }
  };

  const editInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/InventoryUpdate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inventoryId: parseInt(inventoryId),
          name,
          quantity: parseInt(quantity),
        }),
      });
      const data = await response.json();
      if (data.success) {
        setInventoryMessage("Inventory Item Updated");
        window.location.reload();
      } else {
        setInventoryMessage("Failed to update inventory. Please try again.");
      }
    } catch (error) {
      setInventoryMessage("An error occurred. Please try again.");
    }
  };

  const addInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/InventoryAdd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quantity }),
      });
      const data = await response.json();
      if (data.success) {
        setInventoryMessage("New Inventory Item Added");
        window.location.reload();
      }
    } catch (error) {
      setInventoryMessage("An error occurred. Please try again.");
    }
  };

  const deleteInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/InventoryDelete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventoryId }),
      });
      const data = await response.json();
      if (data.success) {
        setInventoryMessage("Inventory Item Deleted");
        window.location.reload();
      }
    } catch (error) {
      setInventoryMessage("An error occurred. Please try again.");
    }
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
                <option key={item.menu_id} value={item.menu_id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label className={styles.label}>Menu ID:</label>
            <input type="text" value={menuId} readOnly className={styles.input} />
            <label className={styles.label}>Menu Name:</label>
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              className={styles.input}
            />
            <button className={styles.button} onClick={addMenu}>
              Add Menu Item
            </button>
            <button className={styles.button} onClick={deleteMenu}>
              Delete Menu Item
            </button>
          </div>
          {Menumessage && <p className = {styles.message}>{Menumessage}</p>}
        </div>

        {/* Price Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Price Editor</h2>
          <div className={styles.form}>
            <label className={styles.label}>Select Price Item:</label>
            <select onChange={(e) => setSelectedPriceItem(e.target.value)} className={styles.select}>
              <option value="">Select...</option>
              {priceItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label className={styles.label}>Price:</label>
            <input
              type="text"
              placeholder="Price"
              className={styles.input}
              onChange={(e) => setPriceValue(e.target.value)}
            />
            <button className={styles.button}>Add/Update Price Item</button>
            <button className={styles.button}>Delete Price Item</button>
          </div>
        </div>

        {/* Inventory Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Inventory Editor</h2>
          <div className={styles.form}>
            <label className={styles.label}>Select Inventory Item:</label>
            <select onChange={handleInventorySelect} className={styles.select}>
              <option value="">Select...</option>
              {inventoryItems.map((item) => (
                <option key={item.inventory_id} value={item.inventory_id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label className={styles.label}>Inventory ID:</label>
            <input type="text" value={inventoryId} readOnly className={styles.input} />
            <label className={styles.label}>Item Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <label className={styles.label}>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.input}
            />
            <button className={styles.button} onClick={addInventory}>
              Add Inventory Item
            </button>
            <button className={styles.button} onClick={editInventory}>
              Edit Inventory Item
            </button>
            <button className={styles.button} onClick={deleteInventory}>
              Delete Inventory Item
            </button>
          </div>

          {Inventorymessage && <p className = {styles.message}>{Inventorymessage}</p>}
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <a href="/ManagerView" className={styles.link}>
          Back to Manager Dashboard
        </a>
      </footer>
    </div>
  );
}

export default EditMenuAndPrices;
