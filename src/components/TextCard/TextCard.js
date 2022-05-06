import React from 'react';
import './TextCard.css';

const TextCard = (props) => {
    return (
        <div className={props.className + " card"}>                
            {props.children}
        </div>
    )
}

export default TextCard;