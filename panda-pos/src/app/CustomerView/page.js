"use client";
import React, { useEffect, useState } from 'react';
import styles from './CustomerViewStyle.module.css'; // Import CSS module
import MainMenuComponent from './CustomerComponents/MainMenuComponent';
import AppetizersComponent from './CustomerComponents/AppetizersComponent';
import DrinksComponent from './CustomerComponents/DrinksComponent';
import CartComponent from './CustomerComponents/CartComponent';

const CustomerView = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const renderContent = () => {
        let instructionmessage = "";
        switch (activeSection) {
            case 'Bowl':
                instructionmessage = "Bowl: Select 1 side and 1 entree."
                return <MainMenuComponent message={instructionmessage}/>;
            case 'Plate':
                instructionmessage = "Plate: Select 1 side and 2 entrees."
                return <MainMenuComponent message={instructionmessage}/>;
            case 'Bigger Plate':
                instructionmessage = "Bigger Plate: Select 1 side and 3 entrees."
                return <MainMenuComponent message={instructionmessage}/>;
            case 'Appetizers':
                return <AppetizersComponent/>;
            case 'Drinks':
                return <DrinksComponent/>;
            case 'A La Carte':
                instructionmessage = "A La Carte: Order items individually."
                return <MainMenuComponent message={instructionmessage}/>;
            case 'Go To Cart':
                instructionmessage = "Checkout"
                return <CartComponent message={instructionmessage}/>;
            default:
                return <div>Select an option</div>;
        }
    };

    return (
        <div className={styles.customerView}>
            <header className={styles.header}>
                <div className={styles.time}>{time}</div>
                <h1 className={styles.title}>Customer View</h1>
            </header>
            <div className = {styles.mainView}>
            <nav className={styles.navigation}>
                <button className={styles.navButton} onClick={() => setActiveSection('Bowl')}>Bowl</button>
                <button className={styles.navButton} onClick={() => setActiveSection('Plate')}>Plate</button>
                <button className={styles.navButton} onClick={() => setActiveSection('Bigger Plate')}>Bigger Plate</button>
                <button className={styles.navButton} onClick={() => setActiveSection('Appetizers')}>Appetizers</button>
                <button className={styles.navButton} onClick={() => setActiveSection('Drinks')}>Drinks</button>
                <button className={styles.navButton} onClick={() => setActiveSection('A La Carte')}>A la Carte</button>
                <button className={styles.navButton} onClick={() => setActiveSection('Go To Cart')}>Go To Cart</button>
            </nav>
            <div className = {styles.background_img}>
            <div className={styles.dataContent}>
                {renderContent()}
            </div>
            </div>
            </div>
        </div>
    );
};

export default CustomerView;