import React from "react"

export default class ActionDiscord extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            serveur: null,
            channel: null,
            message: null
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    onSubmit = () => {
        console.log(this.serveur)
        console.log(this.channel)
        console.log(this.message)
    }

    render() {
        return (
            <div>Selectionnez une action de Discord
                <form>
                    Message <br/>
                    serveur
                    <input type="text" name="serveur" onChange={this.myChangeHandler}/> <br/>
                    channel
                    <input type="text" name="channel" onChange={this.myChangeHandler}/> <br/>
                    message
                    <input type="text" name="message" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form>
                    Mention <br/>
                    serveur
                    <input type="text" name="serveur" onChange={this.myChangeHandler}/> <br/>
                    channel
                    <input type="text" name="channel" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Action"/>
                </form>                
            </div>
        )
    }
}