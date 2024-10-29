import React, { useEffect, useState } from 'react';
import './CustomerViewStyle.css';
import BowlComponent from './CustomerComponents/BowlComponent';

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
                return <BowlComponent/>;
            case 'settings':
                return <div>Settings Content</div>;
            case 'profile':
                return <div>Profile Content</div>;
            default:
                return <div>Select an option</div>;
        }
    };

    return (
        <div className="customer-view">
            <header className="header">
                <div className="time">{time}</div>
                <h1 className="title">Customer View</h1>
            </header>
            <hr className="separator" />
            <div className="main-content">
                <nav className="navigation">
                    <button onClick={() => setActiveSection('Bowl')}>Bowl</button>
                    <button onClick={() => setActiveSection('settings')}>Settings</button>
                    <button onClick={() => setActiveSection('profile')}>Profile</button>
                </nav>
                <div className="data-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default CustomerView;
