import React, { useEffect, useState } from 'react';
import styles from './CustomerViewStyle.module.css'; // Import CSS module
import MainMenuComponent from './CustomerComponents/MainMenuComponent';

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
        switch (activeSection) {
            case 'Bowl':
                return <MainMenuComponent />;
            case 'settings':
                return <div>Settings Content</div>;
            case 'profile':
                return <div>Profile Content</div>;
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
            <hr className={styles.separator} />
            <div className={styles.mainContent}>
                <nav className={styles.navigation}>
                    <button className={styles.navButton} onClick={() => setActiveSection('Bowl')}>Bowl</button>
                    <button className={styles.navButton} onClick={() => setActiveSection('settings')}>Settings</button>
                    <button className={styles.navButton} onClick={() => setActiveSection('profile')}>Profile</button>
                </nav>
                <div className={styles.dataContent}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default CustomerView;
