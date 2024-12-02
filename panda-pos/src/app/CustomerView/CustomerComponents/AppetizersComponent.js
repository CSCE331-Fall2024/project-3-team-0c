
import React, { useState } from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';

const AppetizersComponent = ({ message, addToCart }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the selected item
        setShowAlert(true); // Show the allergy alert
    };

    const handleConfirm = () => {
        setShowAlert(false);
        if (selectedItem) {
            addToCart(selectedItem); // Add item to cart
            setSelectedItem(null); // Reset selection
        }
    };

    return (
        <div
            className={styles.pageZoom}
            style={{
                transformOrigin: "0 0", // Ensures scaling starts from the top-left
            }}
        >
        <div>
            {/* Allergy Alert Modal */}
            {showAlert && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Allergy Alert</h2>
                        <p>
                            {selectedItem.name} may contain allergens such as peanuts, dairy, sesame, and/or wheat. 
                            Please check with staff if you have specific concerns.
                        </p>
                        <button onClick={handleConfirm} className={styles.confirmButton}>
                            OK
                        </button>
                    </div>
                </div>
            )}
            <div className={styles['grid-container']}>
                <div className={styles['row'] + ' ' + styles['button-row']}>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Veggie Spring Roll', type: message, isMainSelection: true  })}>
                        <img src="/photos/veggie.png" alt="Veggie Spring Roll" className={styles.image} />
                        <button className={styles.button}>Veggie Spring Roll</button>
                    </div>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Chicken Spring Roll', type: message, isMainSelection: true  })}>
                        <img src="photos/chicken_egg_roll.png" alt="Chicken Spring Roll" className={styles.image} />
                        <button className={styles.button}>Chicken Spring Roll</button>
                    </div>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Cream Cheese Ragoon', type: message, isMainSelection: true  })}>
                        <img src="photos/crabrangoon.png" alt="Cream Cheese Ragoon" className={styles.image} />
                        <button className={styles.button}>Cream Cheese Ragoon</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AppetizersComponent;
