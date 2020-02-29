import React from 'react';
import DropDown from './DropDown'
import GitHubAuth from '../APICalls/Github'
import ActionReactionForm from './ActionReactionForm'
import DiscordList from './ActionAndReactionLists/Discord'
import GitHubList from './ActionAndReactionLists/GitHub'
import GoogleCalendarList from './ActionAndReactionLists/GoogleCalendar'
import InstagramList from './ActionAndReactionLists/Instagram'
import MessengerList from './ActionAndReactionLists/Messenger'
import OneDriveList from './ActionAndReactionLists/OneDrive'
import OutlookList from './ActionAndReactionLists/Outlook'

const token = localStorage.getItem("token")
localStorage.setItem("discord", false)
localStorage.setItem("github", false)
localStorage.setItem("googlecalendar", false)
localStorage.setItem("instagram", false)
localStorage.setItem("messenger", false)
localStorage.setItem("onedrive", false)
localStorage.setItem("outlook", false)

export default class Home extends React.Component {

    callGitHub = async () => {
        const response = await GitHubAuth(token)
        if (response !== 400) {
            localStorage.setItem("GitHubUrl", response)
        } else {
            alert("Can't connect to GitHub")
        }
    }

    disconnect = () => {
        this.props.history.push("/")
    }

    render () {
        this.callGitHub()
        return (
            <div>
                <ActionReactionForm/>
                <DiscordList/>
                <GitHubList/>
                <GoogleCalendarList/>
                <InstagramList/>
                <MessengerList/>
                <OneDriveList/>
                <OutlookList/>
                <DropDown/>
                <button className="disconnectButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}