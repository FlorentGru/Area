import React from "react"
import Area from '../../Area'

let reaction = {
    "service": "zoho",
    "name": null,
    "params": null
}

export default class ReactionZoho extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dest: null,
            subject: null,
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
            "name": "dest",
            "value": this.state.dest
        }, {
            "name": "subject",
            "value": this.state.subject
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
            <div>Selectionnez une action de Zoho
                <form onSubmit={this.mySubmitHandler}>
                    Send To <br/>
                    dest
                    <input type="text" name="dest" onChange={this.myChangeHandler}/> <br/>
                    subject
                    <input type="text" name="subject" onChange={this.myChangeHandler}/> <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}