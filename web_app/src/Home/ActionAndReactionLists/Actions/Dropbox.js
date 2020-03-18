import React from "react"
import {Redirect} from 'react-router-dom'

let action = {
    "service": "dropbox",
    "name": null,
    "params": null
}


export default class ActionDropbox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            deleted: null,
            create: null,
            rename: null,
            pathChanged: null,
            valid: false
        }
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandlerDeleted = () => {
        action.name = "deleted"
        action.params = []
        let area = JSON.parse(localStorage.getItem("area"));
        area.action = action
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    mySubmitHandlerCreated = () => {
        action.name = "created"
        action.params = []
        let area = JSON.parse(localStorage.getItem("area"));
        area.action = action
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    mySubmitHandlerRenamed = () => {
        action.name = "renamed"
        action.params = []
        let area = JSON.parse(localStorage.getItem("area"));
        area.action = action
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    mySubmitHandlerPath = () => {
        action.name = "path changed"
        action.params = []
        let area = JSON.parse(localStorage.getItem("area"));
        area.action = action
        localStorage.setItem("area", JSON.stringify(area))
        this.setState({valid: true})
    }

    render() {
        if (this.state.valid) {
            return(<Redirect to="/SelectReaction"/>)
        }
        return (
            <div>Selectionnez une action de Dropbox
                <form onSubmit={this.mySubmitHandlerDeleted}>
                    Deleted <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerCreated}>
                    Create <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerRenamed}>
                    Rename <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandlerPath}>
                    Path Changed <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
            </div>
        )
    }
}