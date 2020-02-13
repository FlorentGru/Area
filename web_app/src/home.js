import React from 'react';
import Submit from './sumbit'


export default class Home extends React.Component {

    disconnect = () => {
        this.props.history.push("/")
    }

    render () {
        return (
            <h1>Home
                <p>Welcome {Submit.name}</p>
                <button onClick={this.disconnect}> Disconnect</button>
            </h1>
            )
    }
}