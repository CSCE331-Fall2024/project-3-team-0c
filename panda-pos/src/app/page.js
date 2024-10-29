
import Link from 'next/link';
import Image from 'next/image';

//creates home page for intial default page
const HomePage = () => {
  // buttons style def for buttons used on home page
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
  //creates a gui with option to start an order or login as worker, and has the logo
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>All Aboard The Panda Express!</h1>
      <Image
        src= "/photos/pandaLogo.png"
        alt="Panda Express Logo"
        width={300} 
        height={300} 
      />
      
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


