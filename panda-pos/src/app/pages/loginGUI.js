import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
    },
    main: {
      textAlign: "center",
      width: "300px",
      margin: "0 auto",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    loginForm: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    label: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      fontSize: "16px",
    },
    input: {
      padding: "8px",
      marginTop: "5px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
    },
    button: {
      padding: "8px 12px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#0070f3",
      color: "white",
      cursor: "pointer",
    },
    footer: {
      marginTop: "20px",
      fontSize: "14px",
    },
    link: {
      color: "#0070f3",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.title}>PANDA EXPRESS Sign In</h1>
        <div style={styles.loginForm}>
          <label style={styles.label}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </label>
          <div style={styles.buttonGroup}>
            <button style={styles.button}>Login as Manager</button>
            <button style={styles.button}>Login as Employee</button>
          </div>
        </div>
      </main>
      <footer style={styles.footer}>
        <a href="/" style={styles.link}>Go Back</a>
      </footer>
    </div>
  );
}

export default Login;
