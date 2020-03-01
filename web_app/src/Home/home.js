import React from 'react';
import DropDown from './DropDown'
import getActions from '../APICalls/Action'
import getReactions from '../APICalls/Reaction'
import GitHubAuth from '../APICalls/Github'
import DropBoxAuth from '../APICalls/DropBox'
import ActionReactionForm from './ActionReactionForm'
import DiscordList from './ActionAndReactionLists/Discord'
import GitHubList from './ActionAndReactionLists/GitHub'
import SlackList from './ActionAndReactionLists/Slack'
import TimerList from './ActionAndReactionLists/Timer'
import ZohoList from './ActionAndReactionLists/Zoho'
import DropBoxList from './ActionAndReactionLists/DropBox'
import GmailList from './ActionAndReactionLists/Gmail'

const token = localStorage.getItem("token")

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

const setActions = async () => {
    const response = await getActions();
    if (response !== 400) {
        localStorage.setItem("actions", JSON.stringify(response))
    } else {
        console.log("Can't get the actions")
    }
}

const setReactions = async () => {
    const response = await getReactions();
    if (response !== 400) {
        localStorage.setItem("reactions", JSON.stringify(response))
    } else {
        console.log("Can't get the reactions")
    }
}

setGitHubUrl()
setDropBoxUrl()
setActions()
setReactions()

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
                <SlackList/>
                <TimerList/>
                <ZohoList/>
                <DropBoxList/>
                <GmailList/>
                <DropDown/>
                <button className="disconnectButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}