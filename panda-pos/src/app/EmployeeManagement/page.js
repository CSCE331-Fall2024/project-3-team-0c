"use client";
import React, { useState, useEffect } from "react";
import styles from "./employee.module.css";
import { useRouter } from 'next/navigation';

function EmployeeManagement() {
  const router = useRouter();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [payRate, setpayRate] = useState("");
  const [lastLogin, setlastLogin] = useState("");
  const [password, setpassword] = useState("");
  const [isManager, setisManager] = useState(false);
  const [message, setMessage] = useState("");

  // State variables for employee details (for display only)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]); // Default to empty array    
  const [isLoading, setIsLoading] = useState(true); // For loading state

  // Fetch employee data from the server
  const loadEmployee = async () => {
    try {
      const response = await fetch("http://localhost:8080/employeeLoad", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched Employee Data:", data); // Log the fetched data to check structure
      return data; // If the data is already an array, return it directly
    } catch (error) {
      console.error("Error occurred while fetching employee data:", error);
      return []; // Return an empty array in case of an error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await loadEmployee(); 
      console.log("Fetched Employees:", result); // Debugging: check the structure of result

      if (Array.isArray(result)) {
        setEmployees(result); // Set the employees array directly since result is already an array
      } else {
        setEmployees([]); // Set to empty if result is not an array
      }

      setIsLoading(false); // Stop loading state
    };

    fetchData();
  }, []); // Empty dependency array to call only once when the component mounts

  console.log(employees);
  // Handle employee selection from the dropdown
  const handleEmployeeSelect = (e) => {
    const employeeId = e.target.value;
    const employee = employees.find((emp) => emp.employee_id === parseInt(employeeId)); // Match by employee_id
    setSelectedEmployee(employee);

    if (employee) {
      // Populate form fields with the selected employee's data
      setfirstName(employee.first_name);
      setlastName(employee.last_name);
      setpayRate(employee.payrate);
      setlastLogin(employee.last_login);
      setpassword(employee.password);
      setisManager(employee.is_manager);
    }
  };

  // Edit employee details
  const editEmployee = async () => {
    try {
      const response = await fetch("http://localhost:8080/updateEmployee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, payRate, lastLogin, password, isManager }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Employee Information Edited");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  // Add a new employee
  const addEmployee = async () => {
    try {
      const response = await fetch("http://localhost:8080/addEmployee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, payRate, lastLogin, password, isManager }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("New Employee Added");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  // Delete an employee
  const deleteEmployee = async () => {
    try {
      const response = await fetch("http://localhost:8080/deleteEmployee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Employee Deleted");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };
  const handleReload = () => {
    loadEmployee(); // Manually trigger employee data load
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Employee Management</h1>
      
      
    
      {/* Employee Dropdown */}
      <div className={styles.form}>
     
        <label>
          Select Employee:
          <select className={styles.input} onChange={handleEmployeeSelect} disabled={isLoading}>
            <option value="">Select an employee</option>
            {isLoading ? (
              <option value="" disabled>Loading employees...</option>
            ) : (
              Array.isArray(employees) && employees.length > 0 ? (
                // Using a for loop instead of map
                (() => {
                  const options = [];
                  console.log(employees); // Logs employees to console
                  for (let i = 0; i < employees.length; i++) {
                    const emp = employees[i];
                    options.push(
                      <option key={emp.employee_id} value={emp.employee_id}>
                        {emp.first_name} {emp.last_name}
                      </option>
                    );
                  }
                  return options;
                })()
              ) : (
                <option value="" disabled>No employees available</option>
              )
            )}
          </select>
        </label>

        {/* Display employee details */}
        {selectedEmployee && (
          <>
            <h3>Employee Details</h3>
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Pay Rate:
              <input
                type="text"
                value={payRate}
                onChange={(e) => setpayRate(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Last Login:
              <input
                type="text"
                value={lastLogin}
                onChange={(e) => setlastLogin(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              Is Manager:
              <input
                type="checkbox"
                checked={isManager}
                onChange={(e) => setisManager(e.target.checked)} // Toggle with checked
              />
            </label>
          </>
        )}

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={editEmployee}>Edit</button>
          <button className={styles.button} onClick={deleteEmployee}>Delete</button>
          <button className={styles.button} onClick={addEmployee}>Add New Employee</button>
        </div>
      </div>

      {/* Display message */}
      {message && <p>{message}</p>}

      <footer className={styles.footer}>
        <a href="/ManagerView" className={styles.link}>Back to Manager Dashboard</a>
      </footer>
    </div>
  );
}

export default EmployeeManagement;
