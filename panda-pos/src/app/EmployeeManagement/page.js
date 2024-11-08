"use client";
import React, { useState } from "react";
import styles from "./employee.module.css";

function EmployeeManagement() {
  // State variables for employee details (for display only)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employees = [
    { id: "101", firstName: "John", lastName: "Doe", payRate: 20, lastLogin: "2024-10-20", isManager: false },
    { id: "102", firstName: "Jane", lastName: "Smith", payRate: 25, lastLogin: "2024-11-01", isManager: true },
  ];

    const handleEmployeeSelect = (e) => {
    const employeeId = e.target.value;
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee Management</h1>

      {/* Employee Dropdown */}
      <div style={styles.form}>
        <label>
          Select Employee:
          <select style={styles.input} onChange={handleEmployeeSelect}>
            <option value="">Select an employee</option>

            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
        ))}

          </select>
        </label>

        {selectedEmployee && (
          <>
            <h3>Employee Details</h3>
            <label>
              First Name:
              <input type="text" value={selectedEmployee.firstName} style={styles.input} readOnly />
            </label>
            <label>
              Last Name:
              <input type="text" value={selectedEmployee.lastName} style={styles.input} readOnly />
            </label>
            <label>
              Pay Rate:
              <input type="text" value={selectedEmployee.payRate} style={styles.input} readOnly />
            </label>
            <label>
              Last Login:
              <input type="text" value={selectedEmployee.lastLogin} style={styles.input} readOnly />
            </label>
            <label>
              Is Manager:
              <input type="checkbox" checked={selectedEmployee.isManager} readOnly />
            </label>
          </>
        )}

        {/* Action Buttons (Placeholder) */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button style={styles.button}>Edit</button>
          <button style={{ ...styles.button, backgroundColor: "#ff4500" }}>Delete</button>
          <button style={{ ...styles.button, backgroundColor: "#00cc66" }}>Add New Employee</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
