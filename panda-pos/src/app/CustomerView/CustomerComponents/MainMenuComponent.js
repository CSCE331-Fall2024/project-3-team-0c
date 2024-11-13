import React from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';


const MainMenuComponent = ({ message, addToCart }) => {
    console.log(addToCart);
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
                <div className={styles.card} onClick={() => addToCart('Chow Mein')}>
                    <img src="photos/Sides_ChowMein.png" alt="Chow Mein" className={styles.image} width={24} height={24} />
                    <button className={styles.button}>Chow Mein</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('White Rice')}>
                    <img src="photos/Sides_WhiteSteamedRice.png" alt="White Rice" className={styles.image} width={24} height={24} />
                    <button className={styles.button}>White Rice</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Fried Rice')}>
                    <img src="/photos/Sides_FriedRice.png" alt="Fried Rice" className={styles.image} width={24} height={24} />
                    <button className={styles.button}>Fried Rice</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Super Greens')}>
                    <img src="photos/Vegetables_SuperGreens.png" alt="Super Greens" className={styles.image} />
                    <button className={styles.button}>Super Greens</button>
                </div>


            </div>
            <div className={styles['row'] + ' ' + styles['button-row']}>
                <div className={styles.card} onClick={() => addToCart('Orange Chicken')}>
                    <img src="photos/Chicken_OrangeChicken.png" alt="Orange Chicken" className={styles.image} />
                    <button className={styles.button}>Orange Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Honey Sesame Chicken')}>
                    <img src="photos/ChickenBreast_HoneySesameChickenBreast.png" alt="Honey Sesame Chicken" className={styles.image} />
                    <button className={styles.button}>Honey Sesame Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Broccoli Beef')}>
                    <img src="photos/Beef_BroccoliBeef.png" alt="Broccoli Beef" className={styles.image} />
                    <button className={styles.button}>Broccoli Beef</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Kung Pao Chicken')}>
                    <img src="photos/Chicken_KungPaoChicken.png" alt="Kung Pao Chicken" className={styles.image} />
                    <button className={styles.button}>Kung Pao Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Black Pepper Angus Steak')}>
                    <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Black Pepper Angus Steak" className={styles.image} />
                    <button className={styles.button}>Black Pepper Angus Steak</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Sweet Fire Chicken Breast')}>
                    <img src="/photos/ChickenBreast_SweetFireChickenBreast.png" alt="Sweet Fire Chicken Breast" className={styles.image} />
                    <button className={styles.button}>Sweet Fire Chicken Breast</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Grilled Teriyaki Chicken')}>
                    <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Grilled Teriyaki Chicken" className={styles.image} />
                    <button className={styles.button}>Grilled Teriyaki Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Mushroom Chicken')}>
                    <img src="/photos/Chicken_MushroomChicken.png" alt="Mushroom Chicken" className={styles.image} />
                    <button className={styles.button}>Mushroom Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart('Beijing Beef')}>
                    <img src="/photos/Beef_BeijingBeef.png" alt="Beijing Beef" className={styles.image} />
                    <button className={styles.button}>Beijing Beef</button>
                </div>
                <div className={styles['row'] + ' ' + styles['right-align']}>
                    <button className={styles.button}>Add To Cart</button>
                </div>
            </div>



        </div>

       
    );
};

export default MainMenuComponent;