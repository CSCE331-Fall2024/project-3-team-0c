import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css'; 


/*
* home welcome page front end code below with logo included
*/
const HomePage = () => {
  return (
    <div className={styles.container}>
      
      <Image
        src="/photos/pandaLogo.png"
        alt="Panda Express Logo"
        className={styles.logo} // Use the CSS module class
        width={300} 
        height={300} 
      />
      <h1 className={styles.title}>All Aboard The Panda Express!</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/CustomerView" className={styles.button}>Start an Order</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/loginGUI" className={styles.button}>Log in Manager/Cashier</Link> 
          </li> 
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
