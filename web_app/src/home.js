import React from 'react';
import Submit from './sumbit'


export default class Home extends React.Component {
    render () {
        return (
            <h1>Home
                <p>Welcome {Submit.name}</p>
            </h1>
            )
    }
}