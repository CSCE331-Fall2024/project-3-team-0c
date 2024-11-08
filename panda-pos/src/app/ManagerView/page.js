// src/views/ManagerView.js
"use client";
import styles from "./manager.module.css"
import React from 'react';

//more work to be done -- sprint 2...
function ManagerView() {
  return (
    <div className = {styles.page}>
      <h1 className = {styles.header}>Manager Dashboard</h1>
    
      <div className = {styles.navMenu}>
        <a href= "/EmployeeManagement" className = {styles.navButton}>Employee Management</a>
        <a href = "/InventoryManagement" className = {styles.navButton}>Inventory Management</a>
        <a href = "/ReportsView" className = {styles.navButton}>View Data Reports</a>
      </div>

      <footer className = {styles.footer}>
        <a href= "/" className = {styles.link}>Back to Home</a>
      </footer>
    </div>
  );
}

export default ManagerView;
