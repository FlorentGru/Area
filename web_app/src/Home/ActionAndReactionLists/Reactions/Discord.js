import React from "react"

export default class ReactionDiscord extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            webhookId: null,
            webhookToken: null
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    onSubmit = () => {
        console.log(this.webhookId)
        console.log(this.webhookToken)
    }

    render() {
        return (
            <div>Selectionnez une action de Discord
                <form>
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