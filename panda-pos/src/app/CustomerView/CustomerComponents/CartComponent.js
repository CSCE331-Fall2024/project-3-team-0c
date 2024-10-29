import React, { useState } from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';

const CartComponent = ({ message }) => {
    const [items, setItems] = useState([
        'Orange Chicken',
        'Honey Sesame Chicken',
        'Broccoli Beef'
    ]); // Initial items, replace with dynamic data as needed.


    const handleDeleteItem = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

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

            <div className={styles['row'] + ' ' + styles['order-list']}>
                <ol className={styles['item-list']}>
                    {items.map((item, index) => (
                        <li key={index} className={styles['order-item']}>
                            <span>{item}</span>
                            <button
                                onClick={() => handleDeleteItem(index)}
                                className={styles['delete-button']}
                                aria-label={`Delete ${item}`}
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ol>
            </div>

            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button>Check Out</button>
            </div>
        </div>
    );
};

export default CartComponent;