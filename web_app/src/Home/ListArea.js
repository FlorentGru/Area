import React from "react"

export default class Area extends React.Component {
    render() {
        console.log(this.props.area)
        return (
            <div>
                {this.props.area._id}
                <br/>
                action: {this.props.area.action.service}
                <br/>
                reaction: {this.props.area.reaction.service}
            </div>
        )
    }
}   
