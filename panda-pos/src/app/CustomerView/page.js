"use client";
import React, { useEffect, useState } from 'react';
import styles from './CustomerViewStyle.module.css'; // Import CSS module
import MainMenuComponent from './CustomerComponents/MainMenuComponent';
import AppetizersComponent from './CustomerComponents/AppetizersComponent';
import DrinksComponent from './CustomerComponents/DrinksComponent';
import CartComponent from './CustomerComponents/CartComponent';
import Image from 'next/image';

const CustomerView = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [activeSection, setActiveSection] = useState('home');
    const [cart, setCartItems] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        // Force a small state update after initial render to ensure everything is ready
        setCartItems([]);  // Clear the cart if needed on mount, or make sure it's initialized
    }, []);

    const addToCart = (item) => {
        setCartItems([...cart, item]);
    };

    const zoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); // Max zoom level = 3
    };

    // Zoom out function
    const zoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5)); // Min zoom level = 0.5
    };

    /*
    * Provide instructions for each type of order on each rednering clicked
    * based on the tab clicked provide different food options
    */
    const renderContent = () => {
        let instructionmessage = "";
        switch (activeSection) {
            case 'Bowl':
                instructionmessage = "Bowl"
                return <MainMenuComponent key={activeSection} message={instructionmessage} addToCart={addToCart}/>;

            case 'Plate':
                instructionmessage = "Plate"
                return <MainMenuComponent message={instructionmessage} addToCart={addToCart} />;
            case 'Bigger Plate':
                instructionmessage = "Bigger Plate"
                return <MainMenuComponent message={instructionmessage} addToCart={addToCart} />;
            case 'Appetizers':
                instructionmessage = "Appetizer"
                return <AppetizersComponent message={instructionmessage} addToCart={addToCart} />;
            case 'Drinks':
                instructionmessage = "Drink"
                return <DrinksComponent message={instructionmessage} addToCart={addToCart} />;
            case 'A La Carte':
                instructionmessage = "A La Carte"
                return <MainMenuComponent message={instructionmessage} addToCart={addToCart} />;
            case 'Go To Cart':
                instructionmessage = "Checkout"
                return <CartComponent message={instructionmessage} cartItems={cart} setCartItems={setCartItems}/>;
            default:
                instructionmessage = "Bowl"
                return <MainMenuComponent message={instructionmessage} addToCart={addToCart}/>;
        }
    };

    /*
    * create customer view template 
    * all items are available with organization tabs for bowl, plate, etc.
    */
    return (
        <div className={styles.customerView} style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "0 0", // Ensures scaling starts from the top-left
            width: `${100 / zoomLevel}%`, // Adjust width dynamically
            height: `${100 / zoomLevel}%`, // Adjust height dynamically
        }}>
            <header className={styles.header}>
                <div className={styles.time}>{time}</div>
                <h1 className={styles.title}>Customer View</h1>
                <button onClick={zoomIn}>
                        <Image
                            src="/photos/zoom-in.png"
                            alt="Zoom In"
                            className={styles['zoom-icon']}
                            width={24}
                            height={24}
                        />
                    </button>
                    <button onClick={zoomOut}>
                        <Image
                            src="/photos/zoom-out.png"
                            alt="Zoom Out"
                            className={styles['zoom-icon']}
                            width={24}
                            height={24}
                        />
                    </button>
            </header>
            <div className={styles.mainView}>
                <nav className={styles.navigation}>
                    <button className={styles.navButton} onClick={() => setActiveSection('Bowl')}>Bowl</button>
                    <button className={styles.navButton} onClick={() => setActiveSection('Plate')}>Plate</button>
                    <button className={styles.navButton} onClick={() => setActiveSection('Bigger Plate')}>Bigger Plate</button>
                    <button className={styles.navButton} onClick={() => setActiveSection('Appetizers')}>Appetizers</button>
                    <button className={styles.navButton} onClick={() => setActiveSection('Drinks')}>Drinks</button>
                    <button className={styles.navButton} onClick={() => setActiveSection('A La Carte')}>A la Carte</button>
                    <button className={styles.navButton} onClick={() => setActiveSection('Go To Cart')}>Go To Cart</button>
                </nav>
                <div className={styles.background_img}>
                    <div className={styles.dataContent}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerView;