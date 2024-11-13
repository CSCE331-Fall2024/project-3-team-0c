"use client";
import React, { useState } from "react";
import styles from "./Reports.module.css"; 

function ReportsView() {
  const [selectedGraph, setSelectedGraph] = useState("Select Graph");
  const [startDate, setStartDate] = useState("Select Start Date");
  const [endDate, setEndDate] = useState("Select End Date");

  // Placeholder data 
  const inventoryData = [
    { inventory_ID: 1, name: "Orange Chicken", quantity: 50 },
    { inventory_ID: 2, name: "Kung Pao Chicken", quantity: 30 },
    { inventory_ID: 3, name: "Mushroom Chicken", quantity: 45 },
    { inventory_ID: 4, name: "Teriyaki Chicken", quantity: 20 },
  ];

  const handleGenerateChart = () => {
    // Logic needed here
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Inventory Trends</h1>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Generate Report</h2>
          <div className={styles.form}>
            <label className={styles.label}>Select Graph:</label>
            <select 
              value={selectedGraph} 
              onChange={(e) => setSelectedGraph(e.target.value)} 
              className={styles.select}
            >
              <option value="Select Graph">Select Graph</option>
              <option value="Month-By-Month Sales">Month-By-Month Sales</option>
              <option value="Popular Items">Popular Items</option>
              <option value="Product Usage">Product Usage</option>
              <option value="Sales History">Sales History</option>
            </select>

            <label className={styles.label}>Start Date:</label>
            <select 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className={styles.select}
            >
              <option value="Select Start Date">Select Start Date</option>
              <option value="2024-01-01">2024-01-01</option>
              {/* Add more dates*/}
            </select>

            <label className={styles.label}>End Date:</label>
            <select 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className={styles.select}
            >
              <option value="Select End Date">Select End Date</option>
              <option value="2024-01-31">2024-01-31</option>
              {/* Add more dates*/}
            </select>

            <button onClick={handleGenerateChart} className={styles.button}>Generate</button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Chart Display</h2>
          <div className={styles.chartPlaceholder}>
            <p className={styles.placeholderText}>
              {selectedGraph === "Select Graph" 
                ? "Please select a graph type and generate a report." 
                : `Displaying ${selectedGraph} data here.`}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.tableHeader}>Inventory Table</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeaderCell}>Inventory ID</th>
              <th className={styles.tableHeaderCell}>Name</th>
              <th className={styles.tableHeaderCell}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.inventory_ID}>
                <td className={styles.tableCell}>{item.inventory_ID}</td>
                <td className={styles.tableCell}>{item.name}</td>
                <td className={styles.tableCell}>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        <a href="/ManagerView" className={styles.link}>Back to Manager Dashboard</a>
      </footer>
    </div>
  );
}

export default ReportsView;
