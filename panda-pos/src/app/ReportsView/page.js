"use client";
import React, { useState, useEffect } from "react";
import styles from "./Reports.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// Label mappings for different chart types
const labelMappings = {
  "Sales History": {
    1: "Appetizer",
    2: "Entree",
    3: "Drink",
    4: "Bowl",
    5: "Plate",
    6: "Bigger Plate",
  },
  "Month-By-Month Sales": {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  },
  "Popular Items": {
    1: "Mixed Vegetables",
    2: "Fried Rice",
    3: "Chow Mein",
    4: "White Steamed Rice",
    5: "Beijing Beef",
    6: "Honey Walnut Shrimp",
    7: "Kung Pao Chicken",
    8: "Honey Sesame Chicken",
    9: "Orange Chicken",
    10: "SweetFire Chicken Breast",
    11: "Broccoli Beef",
    12: "Mushroom Chicken",
    13: "Black Pepper Angus Steak",
    14: "Grilled Teriyaki Chicken",
    15: "Black Pepper Chicken",
    16: "Water Bottle",
    17: "Fountain Drink",
    18: "Cream Cheese Rangoon",
    19: "Chicken Egg Roll",
    20: "Veggie Spring Roll",
    21: "Beijing Beef (Duplicate)",
    22: "Big Mac",
    23: "Chicken Kiev",
  },
  "Product Usage": {
    0: "napkin",
  1: "chopstick",
  2: "fork packet",
  3: "plastic bag",
  4: "plate",
  5: "bowl container",
  6: "soy sauce",
  7: "fortune cookie",
  8: "side box",
  9: "chicken",
  10: "orange sauce",
  11: "honey sesame sauce",
  12: "broccoli",
  13: "beef",
  14: "kung pao sauce",
  15: "bell pepper",
  16: "steak",
  17: "black pepper sauce",
  18: "sweetfire sauce",
  19: "pineapple",
  20: "teriyaki sauce",
  21: "mushroom",
  22: "beijing sauce",
  23: "honey walnut sauce",
  24: "rice",
  25: "noodle",
  26: "cabbage",
  27: "carrot",
  28: "pea",
  29: "kale",
  30: "chicken egg roll",
  31: "veggie egg roll",
  32: "cream cheese rangoon",
  33: "cup",
  34: "lid",
  35: "straw",
  36: "water bottle",
  37: "shrimp",
  },
};


function ReportsView() {
  const [selectedGraph, setSelectedGraph] = useState("Select Graph");
  const [startDate, setStartDate] = useState("Select Start Date");
  const [endDate, setEndDate] = useState("Select End Date");
  const [inventoryData, setInventoryData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch inventory data from the server
  const loadInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/InventoryLoad", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch inventory data");

      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error("Error loading inventory:", error);
      alert("Failed to load inventory. Please try again later.");
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  // Generate report for Sales History
  const handleGenerateSalesReport = async () => {
    try {
        setIsLoading(true);
        const payload = { begin: new Date(startDate).getMonth() + 1, end: new Date(endDate).getMonth() + 1 };
        console.log("Payload for Sales Report:", payload);

        const response = await fetch("http://localhost:8080/salesReport", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Sales Report Error:", errorData);
            throw new Error("Failed to fetch sales report");
        }

        const data = await response.json();
        console.log("Sales Report Data:", data);
        setChartData(data);
    } catch (error) {
        console.error("Error generating sales report:", error.message);
        alert("Error generating sales report.");
    } finally {
        setIsLoading(false);
    }
};
  // Generate report for Product Usage
  const handleGenerateProductUsage = async () => {
    try {
      setIsLoading(true);
      const payload = {
        begin: new Date(startDate).getMonth() + 1,
        end: new Date(endDate).getMonth() + 1,
      };

      const response = await fetch("http://localhost:8080/productUsage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to fetch product usage");

      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error generating product usage chart:", error.message);
      alert("Failed to generate product usage chart.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMonthlySalesHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/managerViewMonthlySalesHistory",
        { method: "GET" }
      );
  
      if (!response.ok) throw new Error("Failed to fetch monthly sales history");
  
      const data = await response.json();
      console.log("Monthly Sales History Data:", data);
  
      // Transform array into chartData object
      const chartData = {};
      data.forEach(({ month, total_sales }) => {
        chartData[month] = total_sales; // Backend now returns a number
      });
  
      setChartData(chartData);
    } catch (error) {
      console.error("Error generating monthly sales history:", error.message);
      alert("Failed to generate monthly sales history.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  // Generate report for Popular Items
  const handleGeneratePopularItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/managerViewPopularItems",
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch popular items");

      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error generating popular items chart:", error.message);
      alert("Failed to generate popular items chart.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateChart = async () => {
    if (selectedGraph === "Select Graph") {
      alert("Please select a valid graph type.");
      return;
    }

    if (startDate === "Select Start Date" || endDate === "Select End Date") {
      alert("Please select valid start and end dates.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after the end date.");
      return;
    }

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
              <option value="2024-02-29">2024-02-29</option>
              <option value="2024-03-31">2024-03-31</option>
              <option value="2024-04-30">2024-04-30</option>
              <option value="2024-05-31">2024-05-31</option>
              <option value="2024-06-30">2024-06-30</option>
              <option value="2024-07-31">2024-07-31</option>
              <option value="2024-08-31">2024-08-31</option>
              <option value="2024-09-30">2024-09-30</option>
              <option value="2024-10-31">2024-10-31</option>
              <option value="2024-11-30">2024-11-30</option>
              <option value="2024-12-31">2024-12-31</option>
            </select>

            <label className={styles.label}>End Date:</label>
            <select
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.select}
            >
              <option value="Select End Date">Select End Date</option>
              <option value="2024-01-31">2024-01-31</option>
              <option value="2024-02-29">2024-02-29</option>
              <option value="2024-03-31">2024-03-31</option>
              <option value="2024-04-30">2024-04-30</option>
              <option value="2024-05-31">2024-05-31</option>
              <option value="2024-06-30">2024-06-30</option>
              <option value="2024-07-31">2024-07-31</option>
              <option value="2024-08-31">2024-08-31</option>
              <option value="2024-09-30">2024-09-30</option>
              <option value="2024-10-31">2024-10-31</option>
              <option value="2024-11-30">2024-11-30</option>
              <option value="2024-12-31">2024-12-31</option>
            </select>

            <button
              onClick={handleGenerateChart}
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Generate"}
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Chart Display</h2>
          <div className={styles.chartPlaceholder}>
            {chartData ? (
              <Bar
              data={{
                labels: Object.keys(chartData).map((key) => {
                  const mapping = labelMappings[selectedGraph];
                  return mapping ? mapping[key] || key : key;
                }),
                datasets: [
                  {
                    label: selectedGraph,
                    data: Object.values(chartData),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                  responsive: true,
                  plugins: {
                      legend: { position: "top" },
                      title: { display: true, text: `${selectedGraph} Chart` },
                  },
              }}
          />
          
            ) : (
              <p className={styles.placeholderText}>
                {selectedGraph === "Select Graph"
                  ? "Please select a graph type and generate a report."
                  : "No data available. Please generate a report."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsView;
