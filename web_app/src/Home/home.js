import React from 'react';
import DropDown from './DropDown'
import ActionReactionForm from './ActionReactionForm'
import DiscordList from './ActionAndReactionLists/Discord'
import GitHubList from './ActionAndReactionLists/GitHub'
import SlackList from './ActionAndReactionLists/Slack'
import TimerList from './ActionAndReactionLists/Timer'
import ZohoList from './ActionAndReactionLists/Zoho'
import DropBoxList from './ActionAndReactionLists/DropBox'
import GmailList from './ActionAndReactionLists/Gmail'

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