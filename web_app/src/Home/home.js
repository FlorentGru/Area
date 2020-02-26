import React from 'react';
import DropDown from './DropDown'

export default class Home extends React.Component {
    disconnect = () => {
        this.props.history.push("/")
    }

    render () {
        return (
            <div>Home
                <br/>
                <DropDown/>
                <br/>
                <button className="menuButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}