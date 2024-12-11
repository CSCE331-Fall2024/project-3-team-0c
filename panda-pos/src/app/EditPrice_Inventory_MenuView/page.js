/**
     * @file EditPrice_Inventory_MenuView
     * @description sets up format and functionality of the editing of prices, inventory, and menu
     * @author Grace Ung, Jaden Ninan
     */
"use client";
import React, { useState, useEffect } from "react";
import styles from "./EditPrice_Inventory_Menu.module.css";

/**
 * @function EditMenuAndPrices
 * @description Provides UI for interacting with price, inventory, and menu details and integrates with backend API calls.
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
  const [priceId, setPriceId] = useState("");
  const [priceName, setPriceName] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const [inventoryId, setInventoryId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [Menumessage, setMenuMessage] = useState("");
  const [Inventorymessage, setInventoryMessage] = useState("");
  const [Pricemessage, setPriceMessage] = useState("");


  /**
 * @function loadMenu
 * @description Fetches menu items from the database
 * @returns {Promise<Object[]>} List of menu items or an empty array on error
 * @author Grace Ung
 */
  const loadMenu = async () => {
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/menuLoad", {
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

  /**
 * @function handleMenuItemSelect
 * @description Handles the selection of a menu item from the dropdown and updates the state with the selected item
 * @param {Object} e The event object from the dropdown selection
 * @author Grace Ung
 */
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

/**
 * @function addMenu
 * @description Adds a new menu item to the database
 * @author Grace Ung
 */
  const addMenu = async () => {
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/addMenuItem", {
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

 /**
 * @function deleteMenu
 * @description Deletes a selected menu item from the database.
 * @author Grace Ung
 */
  const deleteMenu = async () => {
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/deleteMenuItem", {
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


  /*
  * Price Editor code button functions
  * implementations fo laoding database values, creating dropdown display, and editing price values
  */

  /**
 * @function loadPrices
 * @description Fetches price items from the database
 * @returns {Promise<Object[]>} List of price items or an empty array on error
 * @author Jaden Ninan
 */
  const loadPrices = async () => {
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/loadPrice", {
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
      const result = await loadPrices();
      setPriceItems(Array.isArray(result) ? result : []);
    };
    fetchMenu();
  }, []);

  /**
 * @function handlePriceItemSelect
 * @description Handles the selection of a price item from the dropdown and updates the state with the selected item
 * @param {Object} e The event object from the dropdown selection
 * @author Jaden Ninan
 */
  const handlePriceItemSelect = (e) => {
    const priceItemId = e.target.value;
    const priceItem = priceItems.find(
      (item) => item.price_id === parseInt(priceItemId)
    );
    setSelectedPriceItem(priceItem);
    if (priceItem) {
      setPriceId(priceItem.price_id);
      setPriceName(priceItem.name);
      setPriceValue(priceItem.price);
    }
 };

 /**
 * @function editPrices
 * @description Updates the selected price item's details in the database
 * @author Jaden Ninan
 */
 const editPrices = async () => {
  try {
    const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/editPrice", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: parseInt(priceId),
        priceName,
        priceValue: parseFloat(priceValue),
      }),
    });
    const data = await response.json();
    if (data.success) {
      setPriceMessage("Price Item Updated");
      window.location.reload();
    } else {
      setPriceMessage("Failed to update prices. Please try again.");
    }
  } catch (error) {
    setPriceMessage("An error occurred. Please try again.");
  }
};



/*
* Inventory  Editor code button functions
* implementations for laoding database values, creating dropdown display, and adding, editing, and deleting values
*/

  /**
 * @function loadInventory
 * @description Fetches inventory items from the database
 * @returns {Promise<Object[]>} List of inventory items or an empty array on error
 * @author Jaden Ninan
 */
  const loadInventory = async () => {
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/InventoryLoad", {
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

  /**
 * @function handleInventorySelect
 * @description Handles the selection of an inventory item from the dropdown and updates the state with the selected item
 * @param {Object} e The event object from the dropdown selection
 * @author Jaden Ninan
 */
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

  /**
 * @function editInventory
 * @description Updates the selected inventory item's details in the database
 * @author Jaden Ninan
 */
  const editInventory = async () => {
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/InventoryUpdate", {
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

  /**
 * @function addInventory
 * @description Adds an inventory item to the database
 * @author Jaden Ninan
 */
  const addInventory = async () => {
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/InventoryAdd", {
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

  /**
 * @function deleteInventory
 * @description Deletes a selected inventory item from the database
 * @author Grace Ung
 */
  const deleteInventory = async () => {
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/InventoryDelete", {
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



  /**
   * Frontend html to create 3 different forms on front end to allow acces to databse buttons for price table, menu table, and inventory
   */
  
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
            <select onChange={handlePriceItemSelect} className={styles.select}>
              <option value="">Select...</option>
              {priceItems.map((item) => (
                <option key={item.price_id} value={item.price_id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label className={styles.label}>Price ID:</label>
            <input type="text" value={priceId} readOnly className={styles.input} />
            <label className={styles.label}>Price Item:</label>
            <input
              type="text"
              value={priceName}
              onChange={(e) => setPriceName(e.target.value)}
              className={styles.input}
            />
            <label className={styles.label}>Price Item Cost:</label>
            <input
              type="text"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              className={styles.input}
            />
             <button className={styles.button} onClick={editPrices}>
              Edit Prices
            </button>
          </div>

          {Pricemessage && <p className = {styles.message}>{Pricemessage}</p>}
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
