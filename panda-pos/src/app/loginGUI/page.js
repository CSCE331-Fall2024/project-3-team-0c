// "use client";
// import Image from 'next/image';
// import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';


// import styles from "./Login.module.css";
// function Login() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   /*
//   * handles employee login button logic
//   * @author Jaden
//   */

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.google) {
//       window.google.accounts.id.initialize({
//         client_id: "425214390685-r9egee7vvho2ip1fepevds0i7htide9e.apps.googleusercontent.com", 
//         callback: handleGoogleLoginResponse,
//       });
//     }
//   }, []);

//   const handleEmployeeLogin = async () => {  //need to incorporate authentication api next sprint
//     try {
//       const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/verifyEmployeeLogin", {  //for posting to express backend server for authentication
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setMessage("Employee login successful!");
//         router.push("/CashierView");
//       } else {
//         setMessage("Invalid employee credentials.");
//       }
//     } catch (error) {  //handle errors
//       setMessage("An error occurred. Please try again.");
//       //console.error(error);
//     }
//   };

//   /*
//   * handles manager login button logic
//   */
//   const handleManagerLogin = async () => {  //need to incorporate authentication api next sprint
//     try {
//       const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/verifyManagerLogin", {  //for posting to express backend server for authentication
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setMessage("Manager login successful!");
//         triggerGoogleAuth();
//         // router.push("/ManagerView");

//       } else {
//         setMessage("Invalid manager credentials.");
//       }
//     } catch (error) {  //handles errors
//       setMessage("An error occurred. Please try again.");
//       //console.error(error);
//     }
//   };

//   const triggerGoogleAuth = () => {
//     if (typeof window.google !== "undefined") {
//       window.google.accounts.id.prompt(); // Trigger Google login dialog
//     } else {
//       console.error("Google Identity Services script not loaded.");
//     }
//   };
//   const handleGoogleLoginResponse = async (response) => {
//     try {
//       const idToken = response.credential;
  
//       // Send the Google ID token to your backend for verification
//       const backendResponse = await fetch("http://localhost:8080/auth/google", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: idToken }),
//       });
  
//       const data = await backendResponse.json();
  
//       if (data.success) {
//         setMessage("Google login successful!");
  
//         // Redirect to the manager page after successful Google authentication
//         router.push("/ManagerView");
//       } else {
//         setMessage("Google login failed.");
//       }
//     } catch (error) {
//       setMessage("An error occurred during Google login.");
//       console.error("Google login error:", error);
//     }
//   };
  

  

//   /*
//   * returns the login gui for users to choose to login as manager or cashier
//   * takes in username / password 
//   */
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           src="/photos/pandaLogo.png"
//           alt="Panda Express Logo"
//           width={200}
//           height={200}
//         />

//         <h1 className={styles.title}>Sign in to PANDA-of-Sales        </h1>
//         <div className={styles.loginForm}>
//           <label className={styles.label}>
//             Username:
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className={styles.input}
//             />
//           </label>
//           <label className={styles.label}>
//             Password:
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={styles.input}
//             />
//           </label>
//           <div className={styles.buttonGroup}>
//             <button className={styles.button} onClick={handleManagerLogin}>Login as Manager</button>
//             <button className={styles.button} onClick={handleEmployeeLogin}>Login as Employee</button>
//           </div>
//           {message && <div className={styles.message}>{message}</div>}
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a href="/" className={styles.link}>Go Back</a>
//       </footer>
//     </div>
//   );
// }

// export default Login;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Login.module.css";

function Login() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      window.google.accounts.id.initialize({
        client_id: "425214390685-r9egee7vvho2ip1fepevds0i7htide9e.apps.googleusercontent.com",
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
  }, []);

  const handleGoogleLoginResponse = async (response) => {
    try {
      const idToken = response.credential;

      // Send the Google ID token to your backend for verification and role validation
      const backendResponse = await fetch(
        "http://localhost:8080/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: idToken }),
        }
      );

      const data = await backendResponse.json();

      if (data.success) {
        setMessage("Login successful!");

        // Redirect user based on their role
        if (data.role === "manager") {
          router.push("/ManagerView");
        } else if (data.role === "employee") {
          router.push("/CashierView");
        } else {
          setMessage("Unauthorized role. Please contact support.");
        }
      } else {
        setMessage("Google authentication failed.");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Sign in to PANDA-of-Sales</h1>
        <div id="googleSignInButton"></div>
        {message && <div className={styles.message}>{message}</div>}
      </main>
      <footer className={styles.footer}>
        <a href="/" className={styles.link}>Go Back</a>
      </footer>
    </div>
  );
}

export default Login;
