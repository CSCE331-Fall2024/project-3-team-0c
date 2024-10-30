// HomeContent.js
import React from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';

const AppetizersComponent = ({ message }) => {
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
                    <img src="/photos/veggie.png" alt="Veggie Spring Roll" className={styles.image} />
                    <button className={styles.button}>Veggie Spring Roll</button>
                </div>
                <div className={styles.card}>
                    <img src="photos/chicken_egg_roll (1).png" alt="Chicken Spring Roll" className={styles.image} />
                    <button className={styles.button}>Chicken Spring Roll</button>
                </div>
                <div className={styles.card}>
                    <img src="photos/crabrangoon.png" alt="Cream Cheese Ragoon" className={styles.image} />
                    <button className={styles.button}>Cream Cheese Ragoon</button>
                </div>

            </div>
            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button className={styles.button}>Add To Cart</button>
            </div>
        </div>
    );
};

export default AppetizersComponent;