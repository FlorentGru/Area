import React from 'react';
import {Redirect} from 'react-router-dom'
import AreaCreation from '../APICalls/AreaCreation'


export default class Area extends React.Component {
    constructor(props) {
        super(props)
        this.state = {response: null}
    }

    redirect = async () => {
        const response = await AreaCreation(JSON.parse(localStorage.getItem("area")))
        if (response === 200) {
            console.log("Created Area")
            this.setState({response: response})
        }
        if (response === 400) {
            console.log("Fail Area")
            this.setState({response: response})
        }
    }
    
    render() {
        if (this.state.response === 200 || this.state.response === 400) {
            return(
                <Redirect to="/Home"/>
            )
        }
        this.redirect()
        return (
            <div>loarding...</div>
        )
    }
}