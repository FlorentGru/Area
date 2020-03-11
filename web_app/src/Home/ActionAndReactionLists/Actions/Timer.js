import React from "react"

export default class ActionTimer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hours: null,
            minutes: null,
            message: null
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    onSubmit = () => {
        console.log(this.hours)
        console.log(this.minutes)
        console.log(this.message)
    }

    render() {
        return (
            <div>Selectionnez une action de Timer
                <form>
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
                <form>
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