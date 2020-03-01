import React from 'react';
import '../CSS/home.css'

export default class ActionReactionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {service: null, action: null, reaction: null}
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    submitNewActionReaction = (event) => {
        event.preventDefault()
        console.log(this.state.service)
        console.log(this.state.action)
        console.log(this.state.reaction)
    }

    render() {
        return (
            <form className='formActionReaction' onSubmit={this.submitNewActionReaction}>
                <p>Add an Area</p>
                <p>The service</p>
                <input type='text' name='service' required={true} onChange={this.myChangeHandler}/>
                <p>The action you want</p>
                <input type='text' name='action' required={true} onChange={this.myChangeHandler}/>
                <p>The reaction you want</p>
                <input type='text' name='reaction' required={true} onChange={this.myChangeHandler}/>
                <br/><br/>
                <input type='submit' value='Create a Area'/>
                <input type='reset' value='reset fields'/>
            </form>
        )
    }
}