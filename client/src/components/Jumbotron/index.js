import React from "react";
import './styles.css';

function Jumbotron(props) {
    
    return (
    <div className="jumbotron">
        <div>
            <div>
                <h1>{props.title.toUpperCase()}</h1>
                <h2>{props.subtitle}</h2>
            </div>
            <hr />
            <div>
                <p>{props.body}</p>
            </div> 
        </div>
    </div>
    );
};

export default Jumbotron;