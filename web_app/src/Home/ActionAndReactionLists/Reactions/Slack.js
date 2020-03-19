import React from "react"
import Area from '../../Area'

let reaction = {
    "service": "slack",
    "name": null,
    "params": null
}

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

    mySubmitHandler = () => {
        reaction.name = "message"
        reaction.params = [{
            "name": "hook",
            "value": this.state.hook
        }]
        let area = JSON.parse(localStorage.getItem("area"));
        area.reaction = reaction
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    render() {
        if (this.state.valid) {
            return (<Area/>)
        }
        return (
            <div>Selectionnez une action de Slack
                <form onSubmit={this.mySubmitHandler}>
                    Message <br/>
                    hook
                    <input type="text" name="hook" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}