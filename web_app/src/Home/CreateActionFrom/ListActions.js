import React from 'react';

export default function ListAction(props) {
    return (
        <div>
            {props.name} {props.type}
            {props.data.map(item =>
            <div key={item}>
                <div>{item}</div>
            </div>)}
        </div>
    );
};
