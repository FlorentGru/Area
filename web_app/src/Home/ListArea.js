import React from "react"
import AreaDelete from '../APICalls/AreaDelete'
import { Redirect } from "react-router-dom"

export default class Area extends React.Component {
    constructor(props) {
        super(props)
        this.state = {reload: false}
    }

    deleteArea = async () => {
        await AreaDelete(this.props.area._id)
        this.setState({reload: true})
    }

    render() {
        if (this.state.reload) {
            return (<Redirect to="/home"/>)
        }
        return (
            <div>
                action: <br/>
                service: {this.props.area.action.service}<br/>
                option: {this.props.area.action.name} <br/>
                <br/>
                reaction: <br/>
                service: {this.props.area.reaction.service}<br/>
                option: {this.props.area.reaction.name} <br/>
                <br/>
                <button onClick={this.deleteArea}>Delete Area</button>
                <br/>
            </div>
        )
    }
}   
