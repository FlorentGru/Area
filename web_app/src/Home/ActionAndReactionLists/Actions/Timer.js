import React from "react"
import {Redirect} from 'react-router-dom'

let action = {
    "service": "discord",
    "name": null,
    "params": null
}

export default class ActionTimer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hours: null,
            minutes: null,
            message: null,
            valid: false
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandlerCountdown = () => {
        action.name = "countdown"
        action.params = [{
            "name": "hours",
            "value": this.state.hours
        }, {
            "name": "minutes",
            "value": this.state.minutes
        }, {
            "name": "message",
            "value": this.state.message
        }]
        let area = JSON.parse(localStorage.getItem("area"));
        area.action = action
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    mySubmitHandlerLoop = () => {
        action.name = "loop"
        action.params = [{
            "name": "hours",
            "value": this.state.hours
        }, {
            "name": "minutes",
            "value": this.state.minutes
        }, {
            "name": "message",
            "value": this.state.message
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
            <div>Selectionnez une action de Timer
                <form onSubmit={this.mySubmitHandlerCountdown}>
                    Countdown <br/>
                    hours
                    <input type="text" name="hours" onChange={this.myChangeHandler}/> <br/>
                    minutes
                    <input type="text" name="minutes" onChange={this.myChangeHandler}/> <br/>
                    message
                    <input type="text" name="message" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerLoop}>
                    Loop <br/>
                    hours
                    <input type="text" name="hours" onChange={this.myChangeHandler}/> <br/>
                    minutes
                    <input type="text" name="minutes" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/>
                </form>                
            </div>
        )
    }
}