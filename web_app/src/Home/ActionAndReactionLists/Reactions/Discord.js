import React from "react"
import {Redirect} from 'react-router-dom'

let reaction = {
    "service": "discord",
    "name": null,
    "params": null
}

export default class ReactionDiscord extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            webhookId: null,
            webhookToken: null,
            valid: false
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandler = () => {
        reaction.name = "message"
        reaction.params = [{
            "name": "webhookId",
            "value": this.state.webhookId
        }, {
            "name": "webhookToken",
            "value": this.state.webhookToken
        }]
        let area = JSON.parse(localStorage.getItem("area"));
        area.reaction = reaction
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    render() {
        if (this.state.valid) {
            return (<Redirect to="/Home"/>)
        }
        return (
            <div>Selectionnez une action de Discord
                <form onSubmit={this.mySubmitHandler}>
                    Message <br/>
                    webhookId
                    <input type="text" name="webhookId" onChange={this.myChangeHandler}/> <br/>
                    webhookToken
                    <input type="text" name="webhookToken" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}