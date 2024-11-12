// HomeContent.js
import React from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';


const DrinksComponent = ({ message, addToCart }) => {
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
                    <button className={styles.button} onClick={() => addToCart('Water Bottle')}>Water Bottle</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/sprite.png" alt="Sprite" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Sprite')}>Sprite</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/rootbeer.png" alt="Root Beer" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Root Beer')}>Root Beer</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/mexcoke.png" alt="Mexican Coke" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Mexican Coke')}>Mexican Coke</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/lemonade.png" alt="Lemonade" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Lemonade')}>Lemonade</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/fanta.png" alt="Fanta" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Fanta')}>Fanta</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/drpepper.png" alt="Dr Pepper" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Dr Pepper')}>Dr Pepper</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/dietcoke.png" alt="Diet Coke" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Diet Coke')}>Diet Coke</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/coke.png" alt="Coke" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Coke')}>Coke</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/applejuice.png" alt="Apple Juice" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Apple Juice')}>Apple Juice</button>
                </div>
            </div>
            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button className={styles.button}>Add To Cart</button>
            </div>
        </div>
    );
};

export default DrinksComponent;