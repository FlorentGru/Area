import React from 'react';
import '../CSS/home.css'

export default class DropDown extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            show: false
        }
        
        this.showMenu = this.showMenu.bind(this)
    }
    
    showMenu(event) {
        event.preventDefault();
        if (this.state.show === true) {
            this.setState({show: false})
        } else {
            this.setState({show: true})
        }
    }

    discord = (event) => {
        event.preventDefault();
        this.props.history.push("/Home/LoginDiscord")
    }

    render() {
        return (
        <div>
            <button className="menuButton" onClick={this.showMenu}>Se connecter à un Service</button>
            {
            this.state.show
                ? (
                <div>
                    <br/>
                    <a className="dropDownButton" href='/LoginDiscord'> Connection Discord</a>
                    <a className="dropDownButton"> Connection GitHub</a>
                    <a className="dropDownButton"> Connection Google Calendar</a>
                    <a className="dropDownButton"> Connection Instagram</a>
                    <a className="dropDownButton"> Connection Messenger</a>
                    <a className="dropDownButton"> Connection OneDrive</a>
                    <a className="dropDownButton"> Connection Outlook</a>
                </div>) : (null)
            }
        </div>
        );
    }
}