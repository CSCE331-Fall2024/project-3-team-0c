import {useState, React} from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';

// main menu with sides and entrees layout for customer view
const MainMenuComponent = ({ message, addToCart }) => {
    console.log(addToCart);
    const [zoomLevel, setZoomLevel] = useState(1);

    const zoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); // Max zoom level = 3
    };

    // Zoom out function
    const zoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5)); // Min zoom level = 0.5
    };


    return (
<div
        className={styles.pageZoom}
        style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "0 0", // Ensures scaling starts from the top-left
        }}
        >
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
            <div className={styles['row'] + ' ' + styles['center-text']}>
                <h2>{message}</h2>
            </div>
            <div className={styles['row'] + ' ' + styles['button-side']}>
                <div className={styles.card} onClick={() => addToCart({name: 'Chow Mein', type: message, isMainSelection: true})}>
                    <img src="photos/Sides_ChowMein.png" alt="Chow Mein" className={styles.image} width={24} height={24} />
                    <button className={styles.button}>Chow Mein</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'White Steamed Rice', type: message, isMainSelection: true})}>
                    <img src="photos/Sides_WhiteSteamedRice.png" alt="White Rice" className={styles.image} width={24} height={24} />
                    <button className={styles.button}>White Rice</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Fried Rice', type: message, isMainSelection: true})}>
                    <img src="/photos/Sides_FriedRice.png" alt="Fried Rice" className={styles.image} width={24} height={24} />
                    <button className={styles.button}>Fried Rice</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Super Greens', type: message, isMainSelection: true})}>
                    <img src="photos/Vegetables_SuperGreens.png" alt="Super Greens" className={styles.image} />
                    <button className={styles.button}>Super Greens</button>
                </div>


            </div>
            <div className={styles['row'] + ' ' + styles['button-row']}>
                <div className={styles.card} onClick={() => addToCart({name: 'Orange Chicken', type: message})}>
                    <img src="photos/Chicken_OrangeChicken.png" alt="Orange Chicken" className={styles.image} />
                    <button className={styles.button}>Orange Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Honey Sesame Chicken', type: message})}>
                    <img src="photos/ChickenBreast_HoneySesameChickenBreast.png" alt="Honey Sesame Chicken" className={styles.image} />
                    <button className={styles.button}>Honey Sesame Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Broccoli Beef', type: message})}>
                    <img src="photos/Beef_BroccoliBeef.png" alt="Broccoli Beef" className={styles.image} />
                    <button className={styles.button}>Broccoli Beef</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Kung Pao Chicken', type: message})}>
                    <img src="photos/Chicken_KungPaoChicken.png" alt="Kung Pao Chicken" className={styles.image} />
                    <button className={styles.button}>Kung Pao Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Black Pepper Angus Steak', type: message})}>
                    <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Black Pepper Angus Steak" className={styles.image} />
                    <button className={styles.button}>Black Pepper Angus Steak</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Sweet Fire Chicken Breast', type: message})}>
                    <img src="/photos/ChickenBreast_SweetFireChickenBreast.png" alt="Sweet Fire Chicken Breast" className={styles.image} />
                    <button className={styles.button}>Sweet Fire Chicken Breast</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Grilled Teriyaki Chicken', type: message})}>
                    <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Grilled Teriyaki Chicken" className={styles.image} />
                    <button className={styles.button}>Grilled Teriyaki Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Mushroom Chicken', type: message})}>
                    <img src="/photos/Chicken_MushroomChicken.png" alt="Mushroom Chicken" className={styles.image} />
                    <button className={styles.button}>Mushroom Chicken</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Beijing Beef', type: message})}>
                    <img src="/photos/Beef_BeijingBeef.png" alt="Beijing Beef" className={styles.image} />
                    <button className={styles.button}>Beijing Beef</button>
                </div>
                <div className={styles['row'] + ' ' + styles['right-align']}>
                    <button className={styles.button}>Add To Cart</button>
                </div>
            </div>



        </div>

       </div>
    );
};

export default MainMenuComponent;
