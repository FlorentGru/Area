import React from "react"

export default class Area extends React.Component {
    render() {
        if (this.props.area === null) {
            return (<div></div>)
        }
        if (this.props.area.length === 0) {
            return (<div>No area created yet</div>)
        } else {
            this.props.area.forEach(element => {
                console.log("loop")
                return (<div>element._id</div>)
            });
            return (<div>here is your list</div>)
        }
    }
}   
