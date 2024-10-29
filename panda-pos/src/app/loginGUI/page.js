"use client"; 
import React, { useState } from "react";

import styles from "./Login.module.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleEmployeeLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/verifyEmployeeLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Employee login successful!");
      } else {
        setMessage("Invalid employee credentials.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  // Function to handle manager login
  const handleManagerLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/verifyManagerLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Manager login successful!");
      } else {
        setMessage("Invalid manager credentials.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>PANDA EXPRESS Sign In</h1>
        <div className={styles.loginForm}>
          <label className={styles.label}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </label>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleManagerLogin}>Login as Manager</button>
            <button className={styles.button} onClick={handleEmployeeLogin}>Login as Employee</button>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="/" className={styles.link}>Go Back</a>
      </footer>
    </div>
  );
}

export default Login;