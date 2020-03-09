import React from "react"

export default class ActionDiscord extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // actions: JSON.parse(localStorage.getItem("actionParams")),
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
        // let actions = JSON.parse(localStorage.getItem("actionParams"));
        // actions.forEach(element => {
        //     console.log(element)
        // })
        console.log(JSON.parse(localStorage.getItem("actionsParams")))
        return (
            <div>Selectionnez une action de Discord
                <form>
                    Message <br/>
                    Serveur
                    <input type="text" name="serveur" onChange={this.myChangeHandler}/> <br/>
                    channel
                    <input type="text" name="channel" onChange={this.myChangeHandler}/> <br/>
                    message
                    <input type="text" name="message" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit"/> <br/>
                </form>
                <br/>
                <form>
                    Mention <br/>
                    Serveur
                    <input type="text"/> <br/>
                    channel
                    <input type="text"/> <br/>
                    <input type="submit"/>
                </form>                
            </div>
        )
    }
}