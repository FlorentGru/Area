import React from 'react';
import DropDown from './DropDown'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    disconnect = () => {
        this.props.history.push("/")
    }

    render () {
        return (
            <div>Home
                <div>Welcome</div>
                <br/>
                <DropDown/>
                <br/>
                <button className="menuButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}