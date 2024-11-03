"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import styles from './MenuBoardView.module.css';

const MenuBoardView = () => {
    // State to manage which content to display
    const [showMainMenu, setShowMainMenu] = useState(true);

    // Effect to switch content every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setShowMainMenu((prev) => !prev); // Toggle the content
        }, 5000); // Switch every 5 seconds

        // Cleanup the interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
            <div className={styles.menuItems}>
                {showMainMenu ? (
                    <>
                    <div className={styles.MenuBoardView}>
                        <header className={styles.header}>
                            <div className={styles.menuPrice}>Bowl: $8.30 - 1 entree + 1 side</div>
                            <div className={styles.menuPrice}>Plate: $9.80 - 1 entree + 2 sides</div>
                            <div className={styles.menuPriceNoBorder}>Bigger Plate: $11.30 - 1 entree + 3 sides</div>
                        </header>
                        <div className={styles.rows}>
                            <div className={styles.text}>Entrees:</div>
                                <div className={styles.row}>
                                    <div className={styles.item}>
                                        <img src="/photos/Sides_WhiteSteamedRice.png" alt="White Rice" />
                                        <span className={styles.caption}>White Rice</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/Sides_FriedRice.png" alt="Fried Rice" />
                                        <span className={styles.caption}>Fried Rice</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/Sides_ChowMein.png" alt="Chow Mein" />
                                        <span className={styles.caption}>Chow Mein</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/Vegetables_SuperGreens.png" alt="Super Greens" />
                                        <span className={styles.caption}>Super Greens</span>
                                    </div>
                                </div>
                        </div>
                        <div className={styles.rows}>
                            <div className={styles.text}>Sides:</div>
                            <div className={styles.row}>
                                <div className={styles.item}>
                                    <img src="/photos/Beef_BeijingBeef.png" alt="Beijing Beef" />
                                    <span className={styles.caption}>Beijing Beef</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/Beef_BroccoliBeef.png" alt="Broccoli Beef" />
                                    <span className={styles.caption}>Broccoli Beef</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/Chicken_GrilledTeriyakiChicken.png" alt="Grilled Teriyaki Chicken" />
                                    <span className={styles.caption}>Grilled Teriyaki Chicken</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/Chicken_KungPaoChicken.png" alt="Kung Pao Chicken" />
                                    <span className={styles.caption}>Kung Pao Chicken</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/Chicken_MushroomChicken.png" alt="Mushroom Chicken" />
                                    <span className={styles.caption}>Mushroom Chicken</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/Chicken_OrangeChicken.png" alt="Orange Chicken" />
                                    <span className={styles.caption}>Orange Chicken</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/ChickenBreast_HoneySesameChickenBreast.png" alt="Honey Sesame Chicken Breast" />
                                    <span className={styles.caption}>Honey Sesame Chicken Breast</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/ChickenBreast_StringBeanChickenBreast.png" alt="String Bean Chicken Breast" />
                                    <span className={styles.caption}>String Bean Chicken Breast</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/ChickenBreast_SweetFireChickenBreast.png" alt="Sweet Fire Chicken Breast" />
                                    <span className={styles.caption}>Sweet Fire Chicken Breast</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/Seafood_HoneyWalnutShrimp.png" alt="Honey Walnut Shrimp" />
                                    <span className={styles.caption}>Honey Walnut Shrimp</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </>
                ) : (
                    <>
                       <div className={styles.MenuBoardView}>
                        <header className={styles.header}>
                            <div className={styles.menuPrice}>Appetizers: $2.00</div>
                            <div className={styles.menuPriceNoBorder}>Drinks: $2.10</div>
                        </header>
                        <div className={styles.rows}>
                            <div className={styles.text}>Appetizers:</div>
                            <div className={styles.row}>
                                <div className={styles.item}>
                                    <img src="photos/crabrangoon.png" alt="Crab Rangoon" />
                                    <span className={styles.caption}>Crab Rangoon</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/veggie.png" alt="Veggie Egg Roll" />
                                    <span className={styles.caption}>Veggie Egg Roll</span>
                                </div>
                                <div className={styles.item}>
                                    <img src="/photos/chicken_egg_roll.png" alt="Chicken Egg Roll" />
                                    <span className={styles.caption}>Chicken Egg Roll</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.displayItems}>
                            <div className={styles.rows}>                         
                                <div className={styles.text}>Drinks:</div>
                                <div className={styles.row}>
                                    <div className={styles.item}>
                                        <img src="/photos/coke.png" alt="Coke" />
                                        <span className={styles.caption}>Coke</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/dietcoke.png" alt="Diet Coke" />
                                        <span className={styles.caption}>Diet Coke</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/drpepper.png" alt="Dr. Pepper" />
                                        <span className={styles.caption}>Dr. Pepper</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/fanta.png" alt="Fanta" />
                                        <span className={styles.caption}>Fanta</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/lemonade.png" alt="Lemonade" />
                                        <span className={styles.caption}>Lemonade</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/rootbeer.png" alt="Root Beer" />
                                        <span className={styles.caption}>Root Beer</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/Sprite.png" alt="Sprite" />
                                        <span className={styles.caption}>Spritet</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/mexcoke.png" alt="Mexican Coke" />
                                        <span className={styles.caption}>Mexican Coke</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/applejuice.png" alt="Apple Juice" />
                                        <span className={styles.caption}>Apple Juice</span>
                                    </div>
                                    <div className={styles.item}>
                                        <img src="/photos/waterbottle.png" alt="Water Bottle" />
                                        <span className={styles.caption}>Water Bottle</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </>
                )}
            </div>
    );

};

export default MenuBoardView;