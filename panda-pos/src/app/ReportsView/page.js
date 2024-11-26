"use client";
import React, { useState, useEffect } from "react";
import styles from "./Reports.module.css"; 



/*
* creates front end for reports view to view inventory in table manner and generate charts for manager
*/
function ReportsView() {
  const [selectedGraph, setSelectedGraph] = useState("Select Graph");
  const [startDate, setStartDate] = useState("Select Start Date");
  const [endDate, setEndDate] = useState("Select End Date");
  const [inventoryData, setInventoryData] = useState([]);

  // Placeholder data that needs to be replaced later
  // const inventoryData = [
  //   { inventory_ID: 1, name: "Orange Chicken", quantity: 50 },
  //   { inventory_ID: 2, name: "Kung Pao Chicken", quantity: 30 },
  //   { inventory_ID: 3, name: "Mushroom Chicken", quantity: 45 },
  //   { inventory_ID: 4, name: "Teriyaki Chicken", quantity: 20 },
  // ];

    // Fetch employee data from the server
  const loadInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/InventoryLoad", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch inventory data");
      }

      const data = await response.json();
      console.log("Fetched Inventory Data:", data);
      setInventoryData(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error occurred while fetching inventory data:", error);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  // Sales Report Front End
  const handleGenerateSalesReport = async () => {
    // if (selectedGraph !== "Sales Report") return;
  
    try {
      const payload = {
        begin: new Date(startDate).getMonth() + 1,
        end: new Date(endDate).getMonth() + 1,
      };
  
      const response = await fetch("http://localhost:8080/salesReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error("Failed to fetch sales report");
  
      const chartData = await response.json();
      setChartData(chartData); // Update the chartData state
    } catch (error) {
      console.error("Error generating sales report:", error.message);
      alert("Error generating sales report. Please try again.");
    }
  };

  // Product Usage Front End
  const handleGenerateProductUsage = async () => {
    // if (selectedGraph !== "Product Usage") return;
  
    try {
      const payload = {
        begin: new Date(startDate).getMonth() + 1,
        end: new Date(endDate).getMonth() + 1,
      };
  
      const response = await fetch("http://localhost:8080/productUsage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error("Failed to fetch product usage");
  
      const chartData = await response.json();
      setChartData(chartData); // Update the chartData state
    } catch (error) {
      console.error("Error generating product usage chart:", error.message);
      alert("Error generating product usage chart. Please try again.");
    }
  };

  // Month-By-Month Sales Front End
  const handleGenerateMonthlySalesHistory = async () => {
    // if (selectedGraph !== "Month-By-Month Sales") return;
  
    try {
      const response = await fetch("http://localhost:8080/managerViewMonthlySalesHistory", {
        method: "GET",
      });
  
      if (!response.ok) throw new Error("Failed to fetch monthly sales history");
  
      const salesData = await response.json();
      setChartData(salesData); // Update the chartData state
    } catch (error) {
      console.error("Error generating monthly sales history:", error.message);
      alert("Error generating monthly sales history. Please try again.");
    }
  };

  // Popular Items Front End
  const handleGeneratePopularItems = async () => {
    // if (selectedGraph !== "Popular Items") return;
  
    try {
      const response = await fetch("http://localhost:8080/managerViewPopularItems", {
        method: "GET",
      });
  
      if (!response.ok) throw new Error("Failed to fetch popular items");
  
      const popularItemsData = await response.json();
      setChartData(popularItemsData); // Update the chartData state
    } catch (error) {
      console.error("Error generating popular items chart:", error.message);
      alert("Error generating popular items chart. Please try again.");
    }
  };
  
  

  const handleGenerateChart = async () => {
    // if (!selectedGraph || selectedGraph === "Select Graph") {
    //   alert("Please select a valid graph type.");
    //   return;
    // }
  
    switch (selectedGraph) {
      case "Sales History":
        await handleGenerateSalesReport();
        break;
      case "Product Usage":
        await handleGenerateProductUsage();
        break;
      case "Month-By-Month Sales":
        await handleGenerateMonthlySalesHistory();
        break;
      case "Popular Items":
        await handleGeneratePopularItems();
        break;
      default:
        alert("Invalid graph type selected.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Data Reports Dashboard</h1>

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
              <option value="2024-01-31">2024-01-31</option>
              <option value="2024-02-31">2024-02-31</option>
              <option value="2024-03-31">2024-03-31</option>
              <option value="2024-04-31">2024-04-31</option>
              <option value="2024-05-31">2024-05-31</option>
              <option value="2024-06-31">2024-06-31</option>
              <option value="2024-07-31">2024-07-31</option>
              <option value="2024-08-31">2024-08-31</option>
              <option value="2024-09-31">2024-09-31</option>
              <option value="2024-10-31">2024-10-31</option>
              <option value="2024-11-31">2024-11-31</option>
            </select>

            <label className={styles.label}>End Date:</label>
            <select 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className={styles.select}
            >
              <option value="Select End Date">Select End Date</option>
              <option value="2024-01-31">2024-01-31</option>
              <option value="2024-02-31">2024-02-31</option>
              <option value="2024-03-31">2024-03-31</option>
              <option value="2024-04-31">2024-04-31</option>
              <option value="2024-05-31">2024-05-31</option>
              <option value="2024-06-31">2024-06-31</option>
              <option value="2024-07-31">2024-07-31</option>
              <option value="2024-08-31">2024-08-31</option>
              <option value="2024-09-31">2024-09-31</option>
              <option value="2024-10-31">2024-10-31</option>
              <option value="2024-11-31">2024-11-31</option>
            </select>

            <button onClick={handleGenerateChart} className={styles.button}>Generate</button>
          </div>
        </div>

        <div className={styles.section}>
          {/* Graph display section*/}
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
        {/* Inventory table display*/}
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
                <td className={styles.tableCell}>{item.inventory_id}</td>
                <td className={styles.tableCell}>{item.name}</td>
                <td className={styles.tableCell}>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            {/* Navigate back to dashboard*/}
      <footer className={styles.footer}>
        <a href="/ManagerView" className={styles.link}>Back to Manager Dashboard</a>
      </footer>
    </div>
  );
}

export default ReportsView;
