// HomeContent.js
import React from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';


const DrinksComponent = ({ message }) => {
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
            <div className={styles['row'] + ' ' + styles['button-row']}>
                <div className={styles.card}>
                    <img src="/photos/waterbottle.png" alt="Water Bottle" className={styles.image} />
                    <button className={styles.button}>Water Bottle</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/sprite.png" alt="Sprite" className={styles.image} />
                    <button className={styles.button}>Sprite</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/rootbeer.png" alt="Root Beer" className={styles.image} />
                    <button className={styles.button}>Root Beer</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/mexcoke.png" alt="Mexican Coke" className={styles.image} />
                    <button className={styles.button}>Mexican Coke</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/lemonade.png" alt="Lemonade" className={styles.image} />
                    <button className={styles.button}>Lemonade</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/fanta.png" alt="Fanta" className={styles.image} />
                    <button className={styles.button}>Fanta</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/drpepper.png" alt="Dr Pepper" className={styles.image} />
                    <button className={styles.button}>Dr Pepper</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/dietcoke.png" alt="Diet Coke" className={styles.image} />
                    <button className={styles.button}>Diet Coke</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/coke.png" alt="Coke" className={styles.image} />
                    <button className={styles.button}>Coke</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/applejuice.png" alt="Apple Juice" className={styles.image} />
                    <button className={styles.button}>Apple Juice</button>
                </div>
            </div>
            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button className={styles.button}>Add To Cart</button>
            </div>
        </div>
    );
};

export default DrinksComponent;