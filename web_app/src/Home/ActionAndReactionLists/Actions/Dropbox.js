import React from "react"
import {Redirect} from 'react-router-dom'

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

    mySubmitHandler = () => {
        this.setState({valid: true})
    }

    render() {
        if (this.state.valid) {
            return(<Redirect to="/SelectReaction"/>)
        }
        return (
            <div>Selectionnez une action de Dropbox
                <form onSubmit={this.mySubmitHandler}>
                    Deleted <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandler}>
                    Create <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandler}>
                    Rename <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
                <form onSubmit={this.mySubmitHandler}>
                    Path Changed <br/>
                    <input type="submit" value="Create Action"/> <br/>
                </form>
                <br/>
            </div>
        )
    }
}