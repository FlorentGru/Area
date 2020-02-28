import React from "react";

const Discord = (props) => {
    const list = props.data.map(item => {
        <li>{item}</li>
    })
    return (
        <div>
            {list}
        </div>
    )
} 

export default Discord;