

import Link from 'next/link';

const HomePage = () => {
  const buttonStyle = {
    display: "inline-block",
    textDecoration: "none",
    color: "white",
    backgroundColor: "#0070f3",
    padding: "10px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
    margin: "10px 0",
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>All Aboard The Panda Express!</h1>
      
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <Link href="/CustomerView" style={buttonStyle}>Start an Order</Link>
          </li>
          <li>
            <Link href="/loginGUI" style={buttonStyle}>Log in Manager/Cashier</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;


