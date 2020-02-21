import React from 'react';


export default class Home extends React.Component {

    disconnect = () => {
        this.props.history.push("/")
    }

    render () {
        return (
            <h1>Home
                <p>Welcome</p>
                <button onClick={this.disconnect}> Disconnect</button>
            </h1>
            )
    }
}