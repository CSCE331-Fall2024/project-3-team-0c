import React from 'react';
import styles from './MainMenuStyle.module.css'; 
import zoom_in from '../../photos/zoom_in_logo.png';
import zoom_out from '../../photos/zoom_out_logo.png';

const MainMenuComponent = ({ message }) => {
    return (
        <div className={styles['grid-container']}>
            <div className={styles['row'] + ' ' + styles['zoom-controls']}>
                <button>
                    <img src={zoom_in} alt="Zoom in" className={styles['button-image']} />
                </button>
                <button>
                    <img src={zoom_out} alt="Zoom out" className={styles['button-image']} />
                </button>
            </div>
            <div className={styles['row'] + ' ' + styles['center-text']}>
                <p>{message}</p>
            </div>
            <div className={styles['row'] + ' ' + styles['button-side']}>
                <button>White Rice</button>
                <button>Fried Rice</button>
                <button>Super Greens</button>
                <button>Chow Mein</button>
            </div>
            <div className={styles['row'] + ' ' + styles['button-row']}>
                <button>Orange Chicken</button>
                <button>Honey Sesame Chicken</button>
                <button>Broccoli Beef</button>
                <button>Kung Pao Chicken</button>
                <button>Black Pepper Angus Steak</button>
                <button>Sweet Fire Chicken Breast</button>
                <button>Grilled Teriyaki Chicken</button>
                <button>Black Pepper Chicken</button>
                <button>Mushroom Chicken</button>
                <button>Beijing Beef</button>
                <button>Honey Walnut Shrimp</button>
            </div>
            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button>Add To Cart</button>
            </div>
        </div>
    );
};

export default MainMenuComponent;
