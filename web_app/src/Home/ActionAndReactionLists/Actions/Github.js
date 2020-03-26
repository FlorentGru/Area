import React from "react"
import {Redirect} from 'react-router-dom'

let action = {
    "service": "github",
    "name": null,
    "params": null
}

export default class ActionGithub extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            owner: null,
            repo: null,
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandlerPush = () => {
        alert("ici")
        action.name = "push"
        action.params = [{
            "name": "owner",
            "value": this.state.owner
        }, {
            "name": "repo",
            "value": this.state.repo
        }]
        let area = JSON.parse(localStorage.getItem("area"));
        area.action = action
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    mySubmitHandlerPull = () => {
        action.name = "pullRequest"
        action.params = [{
            "name": "owner",
            "value": this.state.owner
        }, {
            "name": "repo",
            "value": this.state.repo
        }]
        let area = JSON.parse(localStorage.getItem("area"));
        area.action = action
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    render() {
        if (this.state.valid) {
            return (<Redirect to="/SelectReaction"/>)
        }
        return (
            <div>Selectionnez une action de Github
                <form onSubmit={this.mySubmitHandlerPush}>
                    Push <br/>
                    owner
                    <input type="text" required={true} name="owner" onChange={this.myChangeHandler}/> <br/>
                    repo
                    <input type="text" required={true} name="repo" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerPull}>
                    Pull Request <br/>
                    owner
                    <input type="text" name="owner" onChange={this.myChangeHandler}/> <br/>
                    repo
                    <input type="text" name="repo" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
            </div>
        )
    }
}