"use client";
import React, { useState, useEffect } from "react";
import styles from "./EditPrice_Inventory_Menu.module.css";


/*
* Edit Menu, prices, and invenotry in this forntend interface
*/
function EditMenuAndPrices() {
  // State variables for the menu, price, and inventory items (for display only)
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedPriceItem, setSelectedPriceItem] = useState(null);
 // const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

 //inventory variable declaration
  const [inventoryId, setInventoryId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");


  // Placeholders need to be chaged eventually
  const menuItems = [
    { id: "1", name: "Orange Chicken" },
    { id: "2", name: "Fried Rice" },
  ];

  const priceItems = [
    { id: "1", name: "Bowl", price: 5.00 },
    { id: "2", name: "Plate", price: 8.00 },
  ];

  // const inventoryItems = [
  //   { id: "1", name: "Chicken", quantity: 100 },
  //   { id: "2", name: "Rice", quantity: 50 },
  // ];

  const handleMenuItemSelect = (e) => {
    setSelectedMenuItem(e.target.value);
  };

  const handlePriceItemSelect = (e) => {
    setSelectedPriceItem(e.target.value);
  };

  // const handleInventoryItemSelect = (e) => {
  //   setSelectedInventoryItem(e.target.value);
  // };


  const loadInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/InventoryLoad", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await loadInventory();

      if (Array.isArray(result)) {
        setInventoryItems(result);
      } else {
        setInventoryItems([]);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Handle inventory item selection
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

  // Edit inventory item
  const editInventory = async () => {
    try {
        const response = await fetch("http://localhost:8080/InventoryUpdate", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inventoryId: parseInt(inventoryId),
                name,
                quantity: parseInt(quantity),
            }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage(data.message);
        } else {
            setMessage("Failed to update inventory. Please try again.");
        }
    } catch (error) {
        console.error('Error editing inventory:', error);
        setMessage("An error occurred. Please try again.");
    }
};


  // Add a new inventory item
  const addInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/InventoryAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, quantity }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("New Inventory Item Added");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  // // Delete an inventory item      //not necessarily needed might be able to remove this button in entitrety
  // const deleteInventory = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/deleteInventory", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ inventoryId }),
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       setMessage("Inventory Item Deleted");
  //     }
  //   } catch (error) {
  //     setMessage("An error occurred. Please try again.");
  //   }
  // };



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

            <label>
          Select Inventory Item:
          <select
            className={styles.input}
            onChange={handleInventorySelect}
            disabled={isLoading}
          >
            <option value="">Select an inventory item</option>
            {isLoading ? (
              <option value="" disabled>
                Loading inventory items...
              </option>
            ) : inventoryItems.length > 0 ? (
              inventoryItems.map((item) => (
                <option key={item.inventory_id} value={item.inventory_id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No inventory items available
              </option>
            )}
          </select>
        </label>

        {/* Display inventory details */}
        {selectedInventory && (
          <>
            <h3>Inventory Details</h3>
            <label>
              Inventory ID:
              <input
                type="text"
                value={inventoryId}
                onChange={(e) => setInventoryId(e.target.value)}
                className={styles.input}
                readOnly
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Quantity:
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.input}
              />
            </label>
          </>
        )}

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={editInventory}>
            Edit Inventory
          </button>
          <button className={styles.button} >
            Delete
          </button>
          <button className={styles.button} onClick={addInventory}>
            Add Inventory
          </button>
        </div>
      </div>

      {/* Display message */}
      {message && <p>{message}</p>}

      
    </div>
  </div>
  <footer className = {styles.footer}>
        <a href= "/ManagerView" className = {styles.link}>Back to Manager Dashboard</a>
      </footer> 
</div>  
    );
}

export default EditMenuAndPrices;


