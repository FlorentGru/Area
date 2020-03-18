import React from "react"
import {Redirect} from 'react-router-dom'

let reaction = {
    "service": "spotify",
    "name": null,
    "params": []
}

export default class ReactionSpotify extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playSong: null,
            addSong: null,
            pause: null,
            valid: false
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandlerPlaySong = () => {
        reaction.name = "playSong"
        let area = JSON.parse(localStorage.getItem("area"));
        area.reaction = reaction
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    render() {
        if (this.state.valid) {
            return(<Redirect to="/Home"/>)
        }
        return (
            <div>Selectionnez une action de Zoho
                <form onSubmit={this.mySubmitHandlerPlaySong}>
                    Play Song <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerPlaySong}>
                    Add Song <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerPlaySong}>
                    Pause <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}