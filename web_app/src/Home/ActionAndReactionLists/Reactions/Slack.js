import React from "react"

export default class ReactionSlack extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hook: null
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    onSubmit = () => {
        console.log(this.hook)
        console.log(this.subject)
    }

    render() {
        return (
            <div>Selectionnez une action de Slack
                <form>
                    Message <br/>
                    hook
                    <input type="text" name="hook" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}