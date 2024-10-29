"use client"; 
import React, { useState } from "react";

import styles from "./Login.module.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
            <button className={styles.button}>Login as Manager</button>
            <button className={styles.button}>Login as Employee</button>
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