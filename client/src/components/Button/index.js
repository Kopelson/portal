import React from "react";
import './styles.css';

function Button(props) {
    
    return (
        <button 
            className={props.classes}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.label}
        </button>
    );
};

export default Button;