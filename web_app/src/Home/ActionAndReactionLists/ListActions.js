import React from 'react';
import '../../CSS/home.css'

export default function ListAction(props) {
    const style = {
        "position": "absolute",
        "top": props.top,
        "left": props.left
    }
    return (
        <div className="box" style={style}>
            {props.name} {props.type}
            {props.data.map(item =>
            <p key={item}>
                {item}
            </p>)}
        </div>
    );
};
