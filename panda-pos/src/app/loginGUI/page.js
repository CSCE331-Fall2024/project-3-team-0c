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
//         router.push("/ManagerView");

//       } else {
//         setMessage("Invalid manager credentials.");
//       }
//     } catch (error) {  //handles errors
//       setMessage("An error occurred. Please try again.");
//       //console.error(error);
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
// "use client";
// import Image from 'next/image';
// import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';
// // import { GoogleLogin } from "react-google-login";

// import styles from "./Login.module.css";

// function Login() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Initialize Google Sign-In
//     const initializeGoogleSignIn = () => {
//       window.google.accounts.id.initialize({
//         client_id: "425214390685-r9egee7vvho2ip1fepevds0i7htide9e.apps.googleusercontent.com", // Replace with your Google Client ID
//         callback: handleGoogleLoginResponse,
//       });
//       window.google.accounts.id.renderButton(
//         document.getElementById("googleSignInButton"), // Render the button in this element
//         {
//           theme: "outline",
//           size: "large",
//         }
//       );
//     };

//     if (typeof window !== "undefined" && window.google) {
//       initializeGoogleSignIn();
//     }
//   }, []);

//   const handleGoogleLoginResponse = async (response) => {
//     try {
//       // Send the Google ID token to your backend for verification
//       const backendResponse = await fetch("https://project-3-team-0c-n4yn.onrender.com/auth/google", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: response.credential }),
//       });

//       const data = await backendResponse.json();
//       if (data.success) {
//         setMessage("Google login successful!");
//         // Redirect based on user role or other logic
//         router.push("/Dashboard"); // Replace with the desired route
//       } else {
//         setMessage("Google login failed.");
//       }
//     } catch (error) {
//       setMessage("An error occurred during Google login.");
//     }
//   };

//   const handleEmployeeLogin = async () => {
//     try {
//       const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/verifyEmployeeLogin", {
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
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   const handleManagerLogin = async () => {
//     try {
//       const response = await fetch("https://project-3-team-0c-n4yn.onrender.com/verifyManagerLogin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setMessage("Manager login successful!");
//         router.push("/ManagerView");
//       } else {
//         setMessage("Invalid manager credentials.");
//       }
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           src="/photos/pandaLogo.png"
//           alt="Panda Express Logo"
//           width={200}
//           height={200}
//         />

//         <h1 className={styles.title}>Sign in to PANDA-of-Sales</h1>
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
//           <div id="googleSignInButton"></div>
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
// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// import styles from "./Login.module.css";

// function Login() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loginRole, setLoginRole] = useState(""); // Track whether it's manager or employee

//   useEffect(() => {
//     // Initialize Google Sign-In
//     const initializeGoogleSignIn = () => {
//       if (typeof window !== "undefined" && window.google) {
//         window.google.accounts.id.initialize({
//           client_id: "425214390685-r9egee7vvho2ip1fepevds0i7htide9e.apps.googleusercontent.com", // Replace with your Google Client ID
//           callback: handleGoogleLoginResponse,
//         });
//       } else {
//         console.error("Google Identity Services script not loaded.");
//       }
//     };

//     initializeGoogleSignIn();
//   }, []);

//   const handleGoogleLoginResponse = async (response) => {
//     try {
//       const idToken = response.credential;

//       // Send the Google ID token to your backend for verification
//       const backendResponse = await fetch(
//         `https://project-3-team-0c-n4yn.onrender.com/auth/google?role=${loginRole}`, // Pass the role to the backend
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ token: idToken }),
//         }
//       );

//       const data = await backendResponse.json();
//       if (data.success) {
//         setMessage("Google login successful!");

//         // Redirect based on role
//         if (loginRole === "manager") {
//           router.push("/ManagerView");
//         } else if (loginRole === "employee") {
//           router.push("/CashierView");
//         }
//       } else {
//         setMessage("Google login failed.");
//       }
//     } catch (error) {
//       setMessage("An error occurred during Google login.");
//     }
//   };

//   const handleManagerLogin = () => {
//     setLoginRole("manager");
//     if (typeof window.google !== "undefined") {
//       window.google.accounts.id.prompt(); // Trigger Google login dialog
//     } else {
//       console.error("Google Identity Services script not loaded.");
//     }
//   };

//   const handleEmployeeLogin = () => {
//     setLoginRole("employee");
//     if (typeof window.google !== "undefined") {
//       window.google.accounts.id.prompt(); // Trigger Google login dialog
//     } else {
//       console.error("Google Identity Services script not loaded.");
//     }
//   };

//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           src="/photos/pandaLogo.png"
//           alt="Panda Express Logo"
//           width={200}
//           height={200}
//         />

//         <h1 className={styles.title}>Sign in to PANDA-of-Sales</h1>
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
//             <button className={styles.button} onClick={handleManagerLogin}>
//               Login as Manager
//             </button>
//             <button className={styles.button} onClick={handleEmployeeLogin}>
//               Login as Employee
//             </button>
//           </div>
//           {message && <div className={styles.message}>{message}</div>}
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a href="/" className={styles.link}>
//           Go Back
//         </a>
//       </footer>
//     </div>
//   );
// }

// export default Login;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Login.module.css";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginRole, setLoginRole] = useState(""); // Track the role (manager or employee)

  useEffect(() => {
    // Initialize Google Sign-In
    const initializeGoogleSignIn = () => {
      if (typeof window !== "undefined" && window.google) {
        window.google.accounts.id.initialize({
          client_id: "425214390685-r9egee7vvho2ip1fepevds0i7htide9e.apps.googleusercontent.com", // Replace with your Google Client ID
          callback: handleGoogleLoginResponse,
        });
      } else {
        console.error("Google Identity Services script not loaded.");
      }
    };

    initializeGoogleSignIn();
  }, []);

  const handleGoogleLoginResponse = async (response) => {
    try {
      const idToken = response.credential;

      // Send the Google ID token to your backend for verification
      const backendResponse = await fetch(
        // `https://project-3-team-0c-n4yn.onrender.com/auth/google?role=${loginRole}`, // Pass role to the backend
        `http://localhost:8080/auth/google?role=${loginRole}`,
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
        setMessage("Google login successful!");

        // Redirect based on role
        if (loginRole === "manager") {
          router.push("/ManagerView");
        } else if (loginRole === "employee") {
          router.push("/CashierView");
        }
      } else {
        setMessage("Google login failed.");
      }
    } catch (error) {
      setMessage("An error occurred during Google login.");
    }
  };

  const handleManagerLogin = () => {
    setLoginRole("manager");
    if (typeof window.google !== "undefined") {
      window.google.accounts.id.prompt(); // Trigger Google login dialog
    } else {
      console.error("Google Identity Services script not loaded.");
    }
  };

  const handleEmployeeLogin = () => {
    setLoginRole("employee");
    if (typeof window.google !== "undefined") {
      window.google.accounts.id.prompt(); // Trigger Google login dialog
    } else {
      console.error("Google Identity Services script not loaded.");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          src="/photos/pandaLogo.png"
          alt="Panda Express Logo"
          width={200}
          height={200}
        />

        <h1 className={styles.title}>Sign in to PANDA-of-Sales</h1>
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
            <button className={styles.button} onClick={handleManagerLogin}>
              Login as Manager
            </button>
            <button className={styles.button} onClick={handleEmployeeLogin}>
              Login as Employee
            </button>
          </div>
          {message && <div className={styles.message}>{message}</div>}
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="/" className={styles.link}>
          Go Back
        </a>
      </footer>
    </div>
  );
}

export default Login;

