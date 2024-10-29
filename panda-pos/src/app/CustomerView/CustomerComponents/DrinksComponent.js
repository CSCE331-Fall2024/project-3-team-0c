// HomeContent.js
import React from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';


const DrinksComponent = ({ message }) => {
    return (
        <div className={styles['grid-container']}>
            <div className={styles['row'] + ' ' + styles['zoom-controls']}>
                <Image
                    src="/photos/zoom_in_logo.png"
                    alt="Zoom In"
                    className={styles['zoom-icon']}
                    width={24}
                    height={24}
                />
                <Image
                    src="/photos/zoom_out_logo.png"
                    alt="Zoom Out"
                    className={styles['zoom-icon']}
                    width={24}
                    height={24}
                />
            </div>
            <div className={styles['row'] + ' ' + styles['button-row']}>
                <button>Water Bottle</button>
                <button>Fountain Drink</button>
            </div>
            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button>Add To Cart</button>
            </div>
        </div>
    );
};

export default DrinksComponent;