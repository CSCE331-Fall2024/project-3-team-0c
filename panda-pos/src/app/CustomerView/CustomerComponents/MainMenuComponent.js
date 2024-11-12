import React from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';


const MainMenuComponent = ({ message, addToCart }) => {
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
                <div className={styles.card}>
                    <img src="photos/Sides_ChowMein.png" alt="Chow Mein" className={styles.image} width={24}
                        height={24} />
                    <button className={styles.button} onClick={() => addToCart('Chow Mein')}>Chow Mein</button>
                </div>
                <div className={styles.card}>
                    <img src="photos/Sides_WhiteSteamedRice.png" alt="White Rice" className={styles.image} width={24}
                        height={24} />
                    <button className={styles.button} onClick={() => addToCart('White Rice')}>White Rice</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/Sides_FriedRice.png" alt="Fried Rice" className={styles.image} width={24}
                        height={24} />
                    <button className={styles.button} onClick={() => addToCart('Fried Rice')}>Fried Rice</button>
                </div>
                <div className={styles.card}>
                    <img src="photos/Vegetables_SuperGreens.png" alt="Super Greens" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Super Greens')}>Super Greens</button>
                </div>
                
               
           


            </div>
            <div className={styles['row'] + ' ' + styles['button-row']}>
                <div className={styles.card}>
                    <img src="photos/Chicken_OrangeChicken.png" alt="Orange Chicken" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Orange Chicken')}>Orange Chicken</button>
                </div>
                <div className={styles.card}>
                    <img src="photos/ChickenBreast_HoneySesameChickenBreast.png" alt="Honey Sesame Chicken" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Honey Sesame Chicken')}>Honey Sesame Chicken</button>
                </div>
                <div className={styles.card}>
                    <img src="photos/Beef_BroccoliBeef.png" alt="Broccoli Beef" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Broccoli Beef')}>Broccoli Beef</button>
                </div>
                <div className={styles.card}>
                    <img src="photos/Chicken_KungPaoChicken.png" alt="Kung Pao Chicken" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Kung Pao Chicken')}>Kung Pao Chicken</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Black Pepper Angus Steak" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Black Pepper Angus Steak')}>Black Pepper Angus Steak</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/ChickenBreast_SweetFireChickenBreast.png" alt="Sweet Fire Chicken Breast" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Sweet Fire Chicken Breast')}>Sweet Fire Chicken Breast</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Grilled Teriyaki Chicken" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Grilled Teriyaki Chicken')}>Grilled Teriyaki Chicken</button>
                </div>
               
            
                <div className={styles.card}>
                    <img src="/photos/Chicken_MushroomChicken.png" alt="Mushroom Chicken" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Mushroom Chicken')}>Mushroom Chicken</button>
                </div>
                <div className={styles.card}>
                    <img src="/photos/Beef_BeijingBeef.png" alt="Beijing Beef" className={styles.image} />
                    <button className={styles.button} onClick={() => addToCart('Beijing Beef')}>Beijing Beef</button>
                </div>
                <div className={styles['row'] + ' ' + styles['right-align']}>
                <button className={styles.button}>Add To Cart</button>
            </div>
                

            </div>
           
        </div>
    );
};

export default MainMenuComponent;