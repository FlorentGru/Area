import React from 'react';
import Submit from './sumbit'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: null, password: null, email: null, toHome: false}
    }

    myChangeHandler = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val})
    }
    mySubmitHandler = (event) => {
        event.preventDefault()
        Submit.name = this.state.username
        Submit.password = this.state.password
        Submit.email = this.state.email
        this.props.history.push('/Home')
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
            <h1>Area</h1>
            <p>Enter your name:</p>
            <input
                type='text'
                name='username'
                onChange={this.myChangeHandler}
            />
            <p>Enter your password</p>
            <input
                type='text'
                name='password'
                onChange={this.myChangeHandler}
            />
            <p>Enter your email</p>
            <input
                type='text'
                name='email'
                onChange={this.myChangeHandler}
            />
            <br/>
            <br/>
            <input type="submit" value="Loggin"/>
            </form>
        );
    }
}
