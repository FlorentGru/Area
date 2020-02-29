import React from 'react';

export default function ListAction(props) {
    return (
        <div>
            {props.name} {props.type}
            {props.data.map(item =>
            <li key={item}>
                {item}
            </li>)}
        </div>
    );
};
