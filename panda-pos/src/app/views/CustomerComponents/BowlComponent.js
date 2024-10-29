// HomeContent.js
import React from 'react';
import './BowlComponentStyle.css'; 
import zoom_in from '../../photos/zoom_in_logo.png';
import zoom_out from '../../photos/zoom_out_logo.png';

const BowlComponent = () => {
    return (
        <div className="grid-container">
            <div className="row zoom-controls">
                <button>
                    <img src={zoom_in} alt="Zoom in" className="button-image" />
                </button>
                <button>
                    <img src={zoom_out} alt="Zoom out" className="button-image" />
                </button>
            </div>
            <div className="row center-text">
                <p>Bowl: select a side and 1 entree</p>
            </div>
            <div className="row button-row">
                <button>White Rice</button>
                <button>Fried Rice</button>
                <button>Super Greens</button>
                <button>Chow Mein</button>
            </div>
            <div className="row button-row">
                <button>Orange Chicken</button>
                <button>Honey Sesame Chicken</button>
                <button>Broccoli Beef</button>
                <button>Kung Pao Chicken</button>
                <button>Black Pepper Angus Steak</button>
                <button>Sweet Fire Chicken Breast</button>
            </div>
            <div className="row button-row">
                <button>Grilled Teriyaki Chicken</button>
                <button>Black Pepper Chicken</button>
                <button>Mushroom Chicken</button>
                <button>Beijing Beef</button>
                <button>Honey Walnut Shrimp</button>
            </div>
            <div className="row right-align">
                <button>Add To Cart</button>
            </div>
        </div>
    );
};

export default BowlComponent;
