import React from 'react';
import '../CSS/home.css'
import AreaCreation from '../APICalls/AreaCreation'
// import { Redirect } from 'react-router-dom';

const getParamAction = (service, action) =>
{
    const obj = JSON.parse(localStorage.getItem("actionsParams"))
    let result = null;

    obj.forEach(element => {
        if (element.name === action) {
            result = element.params
        }
    });
    return (result)
}

const getParamReaction = (service, reaction) => {
    const obj = JSON.parse(localStorage.getItem("reactionsParams"))
    let result = null;

    obj.forEach(element => {
        if (element.name === reaction) {
            result = element.params
        }
    });
    return (result)

}

export default class ActionReactionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {actionService: null, action: null, reactionService: null, reaction: null}
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    submitNewActionReaction = async (event) => {
        event.preventDefault()
        const paramAction = getParamAction(this.state.service, this.state.action)
        const paramReaction = getParamReaction(this.state.service, this.state.reaction)
        localStorage.setItem("finalParamAction", paramAction);
        localStorage.setItem("finalParamRaection", paramReaction);
        if (paramAction == null || paramReaction == null) {
            alert("action ou reaction inconnue")
        } else {
            const response = await AreaCreation()
            if (response === 200) {
                alert("Area created")
            } else {
                alert("Error when creating Area")
            }
        }
    }

    render() {
        localStorage.setItem("parametersAction", [])
        localStorage.setItem("parametersReaction", [])
        return (
            <form className='formActionReaction' onSubmit={this.submitNewActionReaction}>
                <p>Add an Area</p>
                <p>The service</p>
                <input type='text' name='actionService' required={true} onChange={this.myChangeHandler}/>
                <p>The action you want</p>
                <input type='text' name='action' required={true} onChange={this.myChangeHandler}/>
                <p>The service</p>
                <input type='text' name='reactionService' required={true} onChange={this.myChangeHandler}/>
                <p>The reaction you want</p>
                <input type='text' name='reaction' required={true} onChange={this.myChangeHandler}/>
                <br/><br/>
                <input type='submit' value='Create a Area'/>
                <input type='reset' value='reset fields'/>
            </form>
        )
    }
}