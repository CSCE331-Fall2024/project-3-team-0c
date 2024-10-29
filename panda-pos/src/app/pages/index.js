// // import Image from "next/image";
// // import styles from "./page.module.css";

// // export default function Home() {
// //   return (
// //     <div className={styles.page}>
// //       <main className={styles.main}>
// //         <Image
// //           className={styles.logo}
// //           src="/1200px-Panda_Express_logo.svg.png"
// //           alt="Panda Express logo"
// //           width={250}
// //           height={258}
// //           priority
// //         />
// //         <ol>
          
// //             All Aboard The Panda Express! 
          
// //         </ol>

// //         <div className={styles.ctas}>
// //           <a
// //             className={styles.primary}
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className={styles.logo}
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Login Cashier/Employee 
// //           </a>
// //           <a
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className={styles.secondary}
// //           >
// //             Start an Order 
// //           </a>
// //         </div>
// //       </main>
// //       <footer className={styles.footer}>
// //         <a
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }

// // src/App.js
// "use client";
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
// import HomeView from './HomeView';
// import CustomerView from './CustomerView';
// import ManagerView from './ManagerView';
// import CashierView from './CashierView';
// import Link from 'next/link';



// function App() {
//   return (
//     // pages/index.js


// const HomePage = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//       <nav>
//         <ul>
//           <li>
//             <Link href="/about">
//               <a>About Page</a>
//             </Link>
//           </li>
//           <li>
//             <Link href="/contact">
//               <a>Contact Page</a>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default HomePage;

//     // <BrowserRouter>
//     //   <div>
        
//     //     <Routes>
//     //       <Route path="/" element={<HomeView />} />
//     //       <Route path="/customer" element={<CustomerView />} />
//     //       <Route path="/manager" element={<ManagerView />} />
//     //       <Route path="/cashier" element={<CashierView />} />
//     //     </Routes>
     
//     //   </div>
//     // </BrowserRouter>
//   );
// }

// export default App;
// pages/index.js
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/CashierView">Cashier View</Link>
          </li>
          <li>
            <Link href="/ManagerView">Manager View</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
