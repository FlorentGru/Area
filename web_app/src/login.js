import React from 'react';
import Submit from './sumbit'

const textCenter = {
    "text-align": "center"
}

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
    myChangeHandlerRegister = (event) => {
        this.props.history.push('/Register')
    }
    render() {
        return (
            <h1>
            <form onSubmit={this.mySubmitHandler} style={textCenter}>
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
            <form onSubmit={this.myChangeHandlerRegister} style={textCenter}>
                <input type="submit" value="Create New Account"/>
            </form>
            </h1>
        );
    }
}
