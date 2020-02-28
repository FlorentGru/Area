import React from 'react';
import '../CSS/home.css'
import GitHubCall from '../APICalls/Github'

export default class DropDown extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            show: false,
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

    callGitHub = async () => {
        const response = await GitHubCall(this.props.token)
        console.log(response)
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
                    <a className="dropDownButton" /*href='/LoginGitHub'*/ onClick={this.callGitHub}> Connection GitHub</a>
                    <a className="dropDownButton" href='/LoginGoogleCalendar'> Connection Google Calendar</a>
                    <a className="dropDownButton" href='/LoginInstagram'> Connection Instagram</a>
                    <a className="dropDownButton" href='/LoginMessenger'> Connection Messenger</a>
                    <a className="dropDownButton" href='/LoginOneDrive'> Connection OneDrive</a>
                    <a className="dropDownButton" href='/LoginOutlook'> Connection Outlook</a>
                </div>) : (null)
            }
            <div></div>
        </div>
        );
    }
}