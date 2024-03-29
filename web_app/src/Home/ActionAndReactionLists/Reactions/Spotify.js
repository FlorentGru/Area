import React from "react"
import Area from '../../Area'

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

    mySubmitHandlerAddSong = () => {
        reaction.name = "addSong"
        let area = JSON.parse(localStorage.getItem("area"));
        area.reaction = reaction
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    mySubmitHandlerPause = () => {
        reaction.name = "pause"
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
                <form onSubmit={this.mySubmitHandlerPlaySong}>
                    Play Song <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerAddSong}>
                    Add Song <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerPause}>
                    Pause <br/>
                    <input type="submit" value="Create Reaction"/> <br/>
                </form>
            </div>
        )
    }
}