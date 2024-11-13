"use client";
import React, { useState } from "react";
import styles from "./employee.module.css";

function EmployeeManagement() {

  const router = useRouter();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [payRate, setpayRate] = useState("");
  const [lastLogin, setlastLogin] = useState("");
  const [password, setpassword] = useState("");
  const [isManager, setisManager] = useState("");
  const [message, setMessage] = useState("");


  // State variables for employee details (for display only)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // const employees = [
  //   { id: "101", firstName: "John", lastName: "Doe", payRate: 20, lastLogin: "2024-10-20",password: "pain", isManager: false },
  //   { id: "102", firstName: "Jane", lastName: "Smith", payRate: 25, lastLogin: "2024-11-01",password: "pain", isManager: true },
  // ];

  const employees = loadEmployee();

  const loadEmployee = async () => {
    try {
      const response = await fetch("http://localhost:8080/loadEmployee", {  //for posting to express backend server for authentication
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, payRate, lastLogin,password, isManager }),
      });

      const data = await response.json();
      if (data.success) {
        
        //setMessage("Employee Information Edited");
      }
    } catch (error) {                                         //handle errors
      //setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };
  const handleEmployeeSelect = (e) => {
    
    const employeeId = e.target.value;
    const employee = employees.find((emp) => emp.id === employeeId);
    setSelectedEmployee(employee);
  };

  const editEmployee = async () => {                                             
    try {
      const response = await fetch("http://localhost:8080/updateEmployee", {  //for posting to express backend server for authentication
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, payRate, lastLogin,password, isManager }),
      });

      const data = await response.json();
      if (data.success) {
        
        setMessage("Employee Information Edited");
      }
    } catch (error) {                                         //handle errors
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const addEmployee = async () => {                                           
    try {
      const response = await fetch("http://localhost:8080/addEmployee", {  //for posting to express backend server for authentication
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, payRate, lastLogin,password, isManager }),
      });

      const data = await response.json();
      if (data.success) {
        
        setMessage("New Employee Added");
      }
    } catch (error) {                                         //handle errors
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const deleteEmployee = async () => {                                             
    try {
      const response = await fetch("http://localhost:8080/deleteEmployee", {  //for posting to express backend server for authentication
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, payRate, lastLogin,password, isManager }),
      });

      const data = await response.json();
      if (data.success) {
        
        setMessage("Employee Deleted");
      }
    } catch (error) {                                         //handle errors
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Employee Management</h1>

      {/* Employee Dropdown */}
      <div className={styles.form}>
        <label>
          Select Employee:
          <select className={styles.input} onChange={handleEmployeeSelect}>
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
              <input
                type="text"
                value={employees.firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={employees.lastName}
                onChange={(e) => setlastName(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Pay Rate:
              <input
                type="text"
                value={employees.payRate}
                onChange={(e) => setpayRate(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Last Login:
              <input
                type="text"
                value={employees.lastLogin}
                onChange={(e) => setlastLogin(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                value={employees.password}
                onChange={(e) => setpassword(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Is Manager:
              <input 
              type="checkbox" 
              checked={employees.isManager}
              onChange={(e) => setisManager(e.target.value)}
               />
            </label>
          </>
        )}

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick = {editEmployee}>Edit</button>
          <button className={`${styles.button}`} onClick = {deleteEmployee}>Delete</button>
          <button className={`${styles.button}`} onClick = {addEmployee}>Add New Employee</button>
        </div>
      </div>

      <footer className = {styles.footer}>
        <a href= "/ManagerView" className = {styles.link}>Back to Manager Dashboard</a>
      </footer> 
    </div>
    
  );
}

export default EmployeeManagement;
