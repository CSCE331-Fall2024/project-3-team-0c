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
                <button>Veggie Spring Roll</button>
                <button>Chicken Spring Roll</button>
                <button>Cream Cheese Ragoon</button>
            </div>
            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button>Add To Cart</button>
            </div>
        </div>
    );
};

export default AppetizersComponent;