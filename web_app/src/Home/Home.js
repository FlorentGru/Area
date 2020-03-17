import React from 'react';
import DropDown from './DropDown'
import {Redirect} from 'react-router-dom'

class CreateArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', reaction: '',valid: false};
    
        this.handleChangeAction = this.handleChangeAction.bind(this);
        this.handleChangeReaction = this.handleChangeReaction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeAction(event) {
        this.setState({action: event.target.value});
    }

    handleChangeReaction(event) {
        this.setState({reaction: event.target.value});
    }
    
    handleSubmit(event) {
        let area = {
            "action": null,
            "reaction": null
        }
        if (this.state.action !== '' && this.state.reaction !== '' ) {
            localStorage.setItem("action", this.state.action)
            localStorage.setItem("reaction", this.state.reaction)
            localStorage.setItem("area", JSON.stringify(area))
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
                <select value={this.state.action} onChange={this.handleChangeAction}>
                    <option />
                    <option value="Discord">Discord</option>
                    <option value="Github">Github</option>
                    <option value="Timer">Timer</option>
                    <option value="Dropbox">Dropbox</option>
                </select>
                </label>
                <br/>
               <label>
                Choisissez votre Reaction:
                <select value={this.state.reaction} onChange={this.handleChangeReaction}>
                    <option />
                    <option value="Discord">Discord</option>
                    <option value="Github">Github</option>
                    <option value="Gmail">Gmail</option>
                    <option value="Slack">Slack</option>
                    <option value="Zoho">Zoho</option>
                </select>
                </label>
                <br/>
                <input type="submit" value="Create Area" />
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