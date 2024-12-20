/**
     * @file MainMenuComponent
     * @description sets up format and functionality of the main menu component
     * @author Grace Ung
     */
import { useState, React } from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';

// main menu with sides and entrees layout for customer view
const MainMenuComponent = ({ message, addToCart }) => {
    console.log(addToCart);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    /**
     * @function handleItemClick
     * @description Adds selected menu item to the cart, shows allergy alert
     * @param {Object} item menu item being added to cart
     * @author Grace Ung
     */
    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the selected item
        setShowAlert(true); // Show the allergy alert
    };

    /**
     * @function handleConfirm
     * @description removes the allergy alert from screen
     * @author Grace Ung
     */
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
                <div className={styles['row'] + ' ' + styles['center-text']}>
                    <h2>{message}</h2>
                </div>
                <div className={styles['row'] + ' ' + styles['button-side']}>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Chow Mein', type: message, isMainSelection: true })}>
                        <img src="photos/Sides_ChowMein.png" alt="Chow Mein" className={styles.image} width={24} height={24} />
                        <button className={styles.button}>Chow Mein</button>
                    </div>
                    <div className={styles.card} onClick={() => addToCart({ name: 'White Steamed Rice', type: message, isMainSelection: true })}>
                        <img src="photos/Sides_WhiteSteamedRice.png" alt="White Rice" className={styles.image} width={24} height={24} />
                        <button className={styles.button}>White Rice</button>
                    </div>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Fried Rice', type: message, isMainSelection: true })}>
                        <img src="/photos/Sides_FriedRice.png" alt="Fried Rice" className={styles.image} width={24} height={24} />
                        <button className={styles.button}>Fried Rice</button>
                    </div>
                    <div className={styles.card} onClick={() => addToCart({ name: 'Super Greens', type: message, isMainSelection: true })}>
                        <img src="photos/Vegetables_SuperGreens.png" alt="Super Greens" className={styles.image} />
                        <button className={styles.button}>Super Greens</button>
                    </div>


                </div>
                <div className={styles['row'] + ' ' + styles['button-row']}>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Orange Chicken', type: message })}>
                        <img src="photos/Chicken_OrangeChicken.png" alt="Orange Chicken" className={styles.image} />
                        <button className={styles.button}>Orange Chicken</button>
                    </div>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Honey Sesame Chicken', type: message })}>
                        <img src="photos/ChickenBreast_HoneySesameChickenBreast.png" alt="Honey Sesame Chicken" className={styles.image} />
                        <button className={styles.button}>Honey Sesame Chicken</button>
                    </div>
                    <div className={styles.card} onClick={() => addToCart({ name: 'Broccoli Beef', type: message })}>
                        <img src="photos/Beef_BroccoliBeef.png" alt="Broccoli Beef" className={styles.image} />
                        <button className={styles.button}>Broccoli Beef</button>
                    </div>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Kung Pao Chicken', type: message })}>
                        <img src="photos/Chicken_KungPaoChicken.png" alt="Kung Pao Chicken" className={styles.image} />
                        <button className={styles.button}>Kung Pao Chicken</button>
                    </div>
                    <div className={styles.card} onClick={() => addToCart({ name: 'Black Pepper Angus Steak', type: message })}>
                        <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Black Pepper Angus Steak" className={styles.image} />
                        <button className={styles.button}>Black Pepper Angus Steak</button>
                    </div>
                    <div className={styles.card} onClick={() => addToCart({ name: 'Sweet Fire Chicken Breast', type: message })}>
                        <img src="/photos/ChickenBreast_SweetFireChickenBreast.png" alt="Sweet Fire Chicken Breast" className={styles.image} />
                        <button className={styles.button}>Sweet Fire Chicken Breast</button>
                    </div>
                    <div className={styles.card} onClick={() => addToCart({ name: 'Grilled Teriyaki Chicken', type: message })}>
                        <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Grilled Teriyaki Chicken" className={styles.image} />
                        <button className={styles.button}>Grilled Teriyaki Chicken</button>
                    </div>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Mushroom Chicken', type: message })}>
                        <img src="/photos/Chicken_MushroomChicken.png" alt="Mushroom Chicken" className={styles.image} />
                        <button className={styles.button}>Mushroom Chicken</button>
                    </div>
                    <div className={styles.card} onClick={() => addToCart({ name: 'Beijing Beef', type: message })}>
                        <img src="/photos/Beef_BeijingBeef.png" alt="Beijing Beef" className={styles.image} />
                        <button className={styles.button}>Beijing Beef</button>
                    </div>
                    <div className={styles.card} onClick={() => handleItemClick({ name: 'Honey Walnut Shrimp', type: message })}>
                        <img src="/photos/Seafood_HoneyWalnutShrimp.png" alt="Honey Walnut Shrimp" className={styles.image} />
                        <button className={styles.button}>Honey Walnut Shrimp</button>
                    
                    </div>
                </div>



            </div>

        </div>
    );
};

export default MainMenuComponent;
