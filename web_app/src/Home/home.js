import React from 'react';
import DropDown from './DropDown'
import GitHubAuth from '../APICalls/Github'
import DropBoxAuth from '../APICalls/DropBox'
import ActionReactionForm from './ActionReactionForm'
import DiscordList from './ActionAndReactionLists/Discord'
import GitHubList from './ActionAndReactionLists/GitHub'
import GoogleCalendarList from './ActionAndReactionLists/GoogleCalendar'
import InstagramList from './ActionAndReactionLists/Instagram'
import MessengerList from './ActionAndReactionLists/Messenger'
import DropBoxList from './ActionAndReactionLists/DropBox'
import OutlookList from './ActionAndReactionLists/Outlook'

const token = localStorage.getItem("token")

localStorage.setItem("discord", false)
localStorage.setItem("github", false)
localStorage.setItem("googlecalendar", false)
localStorage.setItem("instagram", false)
localStorage.setItem("messenger", false)
localStorage.setItem("DropBox", false)
localStorage.setItem("Outlook", false)

const setGitHubUrl = async () => {
    const response = await GitHubAuth(token)
    if (response !== 400) {
        localStorage.setItem("GitHubUrl", response)
    } else {
        console.log("Can't connect to GitHub")
    }
}

const setDropBoxUrl = async () => {
    const response = await DropBoxAuth(token)
    if (response !== 400) {
        localStorage.setItem("DropBoxUrl", response)
    } else {
        console.log("Can't connect to DropBox")
    }
}

setGitHubUrl()
setDropBoxUrl()

export default class Home extends React.Component {
    disconnect = () => {
        this.props.history.push("/")
    }

    render () {
        return (
            <div>
                <ActionReactionForm/>
                <DiscordList/>
                <GitHubList/>
                <GoogleCalendarList/>
                <InstagramList/>
                <MessengerList/>
                <DropBoxList/>
                <OutlookList/>
                <DropDown/>
                <button className="disconnectButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}