import React from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';


const MainMenuComponent = ({ message }) => {
    return (
        <div className={styles['grid-container']}>
            <div className={styles['row'] + ' ' + styles['zoom-controls']}>
                <button><Image
                    src="/photos/zoom-in.png"
                    alt="Zoom In"
                    className={styles['zoom-icon']}
                    width={24}
                    height={24} />
                </button>
                <button>
                    <Image
                        src="/photos/zoom-out.png"
                        alt="Zoom Out"
                        className={styles['zoom-icon']}
                        width={24}
                        height={24} />
                </button>
            </div>
            <div className={styles['row'] + ' ' + styles['center-text']}>
                <p>{message}</p>
            </div>
            <div className={styles['row'] + ' ' + styles['button-side']}>
                <button className={styles.button}>White Rice</button>
                <button className={styles.button}>Fried Rice</button>
                <button className={styles.button}>Super Greens</button>
                <button className={styles.button}>Chow Mein</button>
            </div>
            <div className={styles['row'] + ' ' + styles['button-row']}>
                <button className={styles.button}>Orange Chicken</button>
                <button className={styles.button}>Honey Sesame Chicken</button>
                <button className={styles.button}>Broccoli Beef</button>
                <button className={styles.button}>Kung Pao Chicken</button>
                <button className={styles.button}>Black Pepper Angus Steak</button>
                <button className={styles.button}>Sweet Fire Chicken Breast</button>
                <button className={styles.button}>Grilled Teriyaki Chicken</button>
                <button className={styles.button}>Black Pepper Chicken</button>
                <button className={styles.button}>Mushroom Chicken</button>
                <button className={styles.button}>Beijing Beef</button>
                <button className={styles.button}>Honey Walnut Shrimp</button>
            </div>
            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button>Add To Cart</button>
            </div>
        </div>
    );
};

export default MainMenuComponent;