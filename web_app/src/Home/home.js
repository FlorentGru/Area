import React from 'react';
import DropDown from './DropDown'
import {Redirect} from 'react-router-dom'
// import ActionReactionForm from './ActionReactionForm'
// import DiscordList from './ActionAndReactionLists/Discord'
// import GitHubList from './ActionAndReactionLists/GitHub'
// import SlackList from './ActionAndReactionLists/Slack'
// import TimerList from './ActionAndReactionLists/Timer'
// import ZohoList from './ActionAndReactionLists/Zoho'
// import DropBoxList from './ActionAndReactionLists/DropBox'
// import GmailList from './ActionAndReactionLists/Gmail'

class CreateArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: '', valid: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({action: event.target.action});
    }
    
    handleSubmit(event) {
        if (this.state.action !== '') {
            this.setState({valid: true})
        }
        event.preventDefault();
    }
    
    render() {
        if (this.state.valid) {
            return (
                <Redirect to="/SelectAction"/>
            )
        }
        return (
            <form onSubmit={this.handleSubmit}>
               <label>
                Choisissez votre Action:
                <select action={this.state.action} onChange={this.handleChange}>
                    <option/>
                    <option action="Discord">Discord</option>
                    <option action="Dropbox">DropBox</option>
                    <option action="Github">GitHub</option>
                    <option action="Spotify">Sportify</option>
                </select>
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        );
    }
}

export default class Home extends React.Component {
    disconnect = () => {
        this.props.history.push("/")
    }

    onClickHandlerCreateArea = () => {
        this.props.history.push("/SelectAction")
    }

    render () {
        return (
            <div>

                {/* <ActionReactionForm/> */}
                {/* <DiscordList/>
                <GitHubList/>
                <SlackList/>
                <TimerList/>
                <ZohoList/>
                <DropBoxList/>
                <GmailList/> */}
                <DropDown/>
                <CreateArea/>
                {/* <button className="newAreaButton" onClick={this.onClickHandlerCreateArea}>Create New Area</button> */}
                <button  className="disconnectButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}