import React from "react"
import {Redirect} from 'react-router-dom'

export default class ActionDiscord extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            serveur: null,
            channel: null,
            message: null,
            valid: false
        }
    }

    mySubmitHandlerMessage = (event) => {
        event.preventDefault();
        console.log(this.state.serveur)
        console.log(this.state.channel)
        console.log(this.state.message)
        this.setState({valid: true})
    }

    mySubmitHandlerMention = (event) => {
        event.preventDefault();
        console.log(this.state.serveur)
        console.log(this.state.channel)
        console.log(this.state.message)
        this.setState({valid: true})
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    render() {
        if (this.state.valid) {
            return (<Redirect to="/SelectReaction"/>)
        }
        return (
            <div>Selectionnez une action de Discord
                <form onSubmit={this.mySubmitHandlerMessage}>
                    Message <br/>
                    serveur
                    <input required={true} type="text" name="serveur" onChange={this.myChangeHandler}/> <br/>
                    channel
                    <input required={true} type="text" name="channel" onChange={this.myChangeHandler}/> <br/>
                    message
                    <input required={true} type="text" name="message" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerMention}>
                    Mention <br/>
                    serveur
                    <input required={true} type="text" name="serveur" onChange={this.myChangeHandler}/> <br/>
                    channel
                    <input required={true} type="text" name="channel" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/>
                </form>                
            </div>
        )
    }
}