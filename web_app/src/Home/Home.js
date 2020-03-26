import React from 'react';
import DropDown from './DropDown'
import {Redirect} from 'react-router-dom'
import AreaList from '../APICalls/AreaList'
import Area from './ListArea'

class CreateArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', reaction: '',valid: false};
    
        this.handleChangeAction = this.handleChangeAction.bind(this);
        this.handleChangeReaction = this.handleChangeReaction.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }
    
    handleChangeAction(event) {
        this.setState({action: event.target.value});
    }

    handleChangeReaction(event) {
        this.setState({reaction: event.target.value});
    }
    
    mySubmitHandler(event) {
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
            <form onSubmit={this.mySubmitHandler}>
               <label>
                Choose your Action:
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
                Choose you Reaction:
                <select value={this.state.reaction} onChange={this.handleChangeReaction}>
                    <option />
                    <option value="Discord">Discord</option>
                    <option value="Github">Github</option>
                    <option value="Gmail">Gmail</option>
                    <option value="Slack">Slack</option>
                    <option value="Zoho">Zoho</option>
                    <option value="Spotify">Spotify</option>
                </select>
                </label>
                <br/>
                <input type="submit" value="Create Area" />
            </form>
        );
    }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {area: null, valid: false}
    }

    getMyAreas = async () => {
        const response = await AreaList()
        if (response.status === 200) {
            this.setState({area: response.data.data})
            this.setState({valid: true})
        } else {
            console.log("error when loading areas")
        }
    }

    disconnect = () => {
        this.props.history.push("/Login")
    }

    onClickHandlerCreateArea = () => {
        this.props.history.push("/SelectAction")
    }

    render () {
        if (this.state.area === null)
            this.getMyAreas()
        return (
            <div>
                <DropDown/>
                <CreateArea/>
                {this.state.valid ? (
                    this.state.area.map(function(name, index) {
                        return (<Area key={index} area={name}/>)
                    })
                ) : null
                }
                <button  className="disconnectButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}