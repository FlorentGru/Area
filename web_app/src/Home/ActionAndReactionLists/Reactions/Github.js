import React from "react"
import Area from '../../Area'

let reaction = {
    "service": "github",
    "name": null,
    "params": null
}

export default class ReactionGmail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            owner: null,
            repo: null,
            valid: false
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandler = () => {
        reaction.name = "issue"
        reaction.params = [{
            "name": "owner",
            "value": this.state.owner
        }, {
            "name": "repo",
            "value": this.state.repo
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
            <div>Selectionnez une action de Github
                <form onSubmit={this.mySubmitHandler}>
                    Issue <br/>
                    owner
                    <input type="text" name="owner" onChange={this.myChangeHandler}/> <br/>
                    repo
                    <input type="text" name="repo" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}