
import React, { useState } from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';

const AppetizersComponent = ({ message, addToCart }) => {
    const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level
    const [showAlert, setShowAlert] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const zoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); // Max zoom level = 3
    };

    // Zoom out function
    const zoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5)); // Min zoom level = 0.5
    };

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
            transform: `scale(${zoomLevel})`,
            transformOrigin: "0 0", // Ensures scaling starts from the top-left
        }}
        >
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
                <div className={styles['row'] + ' ' + styles['zoom-controls']}>
                    <button onClick={zoomIn}>
                        <Image
                            src="/photos/zoom-in.png"
                            alt="Zoom In"
                            className={styles['zoom-icon']}
                            width={24}
                            height={24}
                        />
                    </button>
                    <button onClick={zoomOut}>
                        <Image
                            src="/photos/zoom-out.png"
                            alt="Zoom Out"
                            className={styles['zoom-icon']}
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
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
    );
};

export default AppetizersComponent;
