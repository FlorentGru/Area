import React from 'react';
import DropDown from './DropDown'
// import Discord from '../Home/ActionsReactions/Discord';
// const data = require("../data.json")

const token = localStorage.getItem("token")

export default class Home extends React.Component {
    disconnect = () => {
        this.props.history.push("/")
        // this.state = {discord: false, github: false, googlecalendar: false, }
    }
    render () {
        return (
            <div>Home
                <br/>
                <DropDown token={token}/>
                <br/>
                {/* <Discord data={data.discord}/> */}
                <button className="menuButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}