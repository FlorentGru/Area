import React from "react";


export default class Component extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>Hello {this.props.name}</div>);
    }
}   