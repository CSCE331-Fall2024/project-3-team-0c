// HomeContent.js
import {useState, React} from 'react';
import styles from './MainMenuStyle.module.css';
import Image from 'next/image';


const DrinksComponent = ({ message, addToCart }) => {
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
            <div className={styles['row'] + ' ' + styles['button-row']}>
                <div className={styles.card} onClick={() => addToCart({name: 'Water Bottle', type: message, isMainSelection: true})}>
                    <img src="/photos/waterbottle.png" alt="Water Bottle" className={styles.image} />
                    <button className={styles.button}>Water Bottle</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Sprite', type: message, isMainSelection: true})}>
                    <img src="/photos/sprite.png" alt="Sprite" className={styles.image} />
                    <button className={styles.button}>Sprite</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Root Beer', type: message, isMainSelection: true})}>
                    <img src="/photos/rootbeer.png" alt="Root Beer" className={styles.image} />
                    <button className={styles.button}>Root Beer</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Mexican Coke', type: message, isMainSelection: true})}>
                    <img src="/photos/mexcoke.png" alt="Mexican Coke" className={styles.image} />
                    <button className={styles.button}>Mexican Coke</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Lemonade', type: message, isMainSelection: true})}>
                    <img src="/photos/lemonade.png" alt="Lemonade" className={styles.image} />
                    <button className={styles.button}>Lemonade</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Fanta', type: message, isMainSelection: true})}>
                    <img src="/photos/fanta.png" alt="Fanta" className={styles.image} />
                    <button className={styles.button}>Fanta</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Dr Pepper', type: message, isMainSelection: true})}>
                    <img src="/photos/drpepper.png" alt="Dr Pepper" className={styles.image} />
                    <button className={styles.button}>Dr Pepper</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Diet Coke', type: message, isMainSelection: true})}>
                    <img src="/photos/dietcoke.png" alt="Diet Coke" className={styles.image} />
                    <button className={styles.button}>Diet Coke</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Coke', type: message, isMainSelection: true})}>
                    <img src="/photos/coke.png" alt="Coke" className={styles.image} />
                    <button className={styles.button}>Coke</button>
                </div>
                <div className={styles.card} onClick={() => addToCart({name: 'Apple Juice', type: message, isMainSelection: true})}>
                    <img src="/photos/applejuice.png" alt="Apple Juice" className={styles.image} />
                    <button className={styles.button}>Apple Juice</button>
                </div>
            </div>
            <div className={styles['row'] + ' ' + styles['right-align']}>
                <button className={styles.button}>Add To Cart</button>
            </div>

        </div>
        </div>
    );
};

export default DrinksComponent;