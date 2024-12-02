"use client";
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


import styles from "./Login.module.css";
function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  /*
  * handles employee login button logic
  * @author Jaden
  */


  const handleEmployeeLogin = async () => {  //need to incorporate authentication api next sprint
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/verifyEmployeeLogin", {  //for posting to express backend server for authentication
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Employee login successful!");
        router.push("/CashierView");
      } else {
        setMessage("Invalid employee credentials.");
      }
    } catch (error) {  //handle errors
      setMessage("An error occurred. Please try again.");
      //console.error(error);
    }
  };

  /*
  * handles manager login button logic
  */
  const handleManagerLogin = async () => {  //need to incorporate authentication api next sprint
    try {
      const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/verifyManagerLogin", {  //for posting to express backend server for authentication
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Manager login successful!");
        router.push("/ManagerView");

      } else {
        setMessage("Invalid manager credentials.");
      }
    } catch (error) {  //handles errors
      setMessage("An error occurred. Please try again.");
      //console.error(error);
    }
  };


  /*
  * returns the login gui for users to choose to login as manager or cashier
  * takes in username / password 
  */
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          src="/photos/pandaLogo.png"
          alt="Panda Express Logo"
          width={200}
          height={200}
        />

        <h1 className={styles.title}>Sign in to PANDA-of-Sales        </h1>
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
          {message && <div className={styles.message}>{message}</div>}
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="/" className={styles.link}>Go Back</a>
      </footer>
    </div>
  );
}

export default Login;