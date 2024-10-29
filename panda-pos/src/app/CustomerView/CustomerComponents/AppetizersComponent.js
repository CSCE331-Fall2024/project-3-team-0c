// HomeContent.js
import React from 'react';
import './MainMenuStyle.css';
import zoom_in from '../../photos/zoom_in_logo.png';
import zoom_out from '../../photos/zoom_out_logo.png';

const AppetizersComponent = ({message}) => {
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
            <div className="row button-row">
                <button>Veggie Spring Roll</button>
                <button>Chicken Spring Roll</button>
                <button>Cream Cheese Ragoon</button>
            </div>
            <div className="row right-align">
                <button>Add To Cart</button>
            </div>
        </div>
    );
};

export default AppetizersComponent;
