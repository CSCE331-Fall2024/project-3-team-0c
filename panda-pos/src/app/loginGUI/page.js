"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import Image from 'next/image';

function Login() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showGoogleButton, setShowGoogleButton] = useState(false);
  const [role, setRole] = useState(""); // To track the selected role (Manager or Employee)

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && showGoogleButton) {
      window.google.accounts.id.initialize({
        client_id: "425214390685-pida2qb7nfe95a3fe5gq2hp525493ee2.apps.googleusercontent.com",
        callback: handleGoogleLoginResponse,
      });

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        {
          theme: "outline",
          size: "large",
        }
      );
    }
  }, [showGoogleButton]); // Run this effect whenever `showGoogleButton` changes

  const handleManagerLogin = () => {
    setRole("Manager");
    setShowGoogleButton(true); // Show Google Sign-In button after selecting Manager
  };

  const handleEmployeeLogin = () => {
    setRole("Employee");
    setShowGoogleButton(true); // Show Google Sign-In button after selecting Employee
  };

  const handleGoogleLoginResponse = async (response) => {
    try {
      const idToken = response.credential;

      // Send the Google ID token to your backend for verification and role validation
      const backendResponse = await fetch("https://project-3-team-0c-n4yn.onrender.com/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken, role_id: role}),
      });
      const data = await backendResponse.json();

      if (data.success) {
        setMessage("Login successful!");

  
        // Redirect user based on their role
        if (role == "Manager") {
        router.push("/ManagerView");
        }  else {
          router.push("/CashierView");
        }
      } else {
        setMessage("Google authentication failed.");
      }
    } catch (error) {
      // Log the full error to the console for debugging
      console.error("Error during login:", error);
  
      // Set a user-friendly error message
      setMessage("An error occurred during login.");
  
      // Optionally, show the error message in an alert or log it in more detail
      alert("Login error: " + (error.message || error));  // `error.message` gives you a more descriptive error
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Sign in to PANDA-of-Sales</h1>
        <Image
          src="/photos/pandaLogo.png"
          alt="Panda Express Logo"
          width={200}
          height={200}
        />


        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={handleManagerLogin}>Login as Manager</button>
          <button className={styles.button} onClick={handleEmployeeLogin}>Login as Employee</button>
        </div>
        {message && <div className={styles.message}>{message}</div>}

        {/* Render Google Sign-In button conditionally */}
        {showGoogleButton && (
          <div id="googleSignInButton"></div>
        )}

        {message && <div className={styles.message}>{message}</div>}
      </main>

      <footer className={styles.footer}>
        <a href="/" className={styles.link}>Go Back</a>
      </footer>
    </div>
  );
}

export default Login;



