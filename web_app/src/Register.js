import React from 'react';
import Submit from './sumbit'

const textCenter = {
    "text-align": "center"
}


export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: null, password: null, email: null, toHome: false}
    }

    returnLoginPage = () => {
        this.props.history.push("/")
    }

    mySubmitHandler = (event) => {
        event.preventDefault()
        Submit.name = this.state.username
        Submit.password = this.state.password
        Submit.confirm_password = this.state.confirm_password;
        Submit.email = this.state.email
        Submit.confirm_email = this.state.confirm_email
        this.props.history.push('/Home')
    }
    render() {
        return (
            <p>
            <form onSubmit={this.mySubmitHandler} style={textCenter}>
            <h1>Area</h1>
            <p>Enter your name:</p>
            <input
                type='text'
                name='username'
                required='true'
            />
            <p>Enter your password</p>
            <input
                type='password'
                name='password'
                required='true'
            />
            <p>Confirm password</p>
            <input
                type='password'
                name='confirm_password'
                required='true'
            />
            <p>Enter your email</p>
            <input
                type='text'
                name='email'
                required='true'
            />
           <p>Confirm email</p>
            <input
                type='text'
                name='confirm_email'
                required='true'
            />
 
            <br/>
            <br/>
            <input type="submit" value="Create Account"/>
            <br/>
            <button onClick={this.returnLoginPage}>Return login page</button>
            </form>
            </p>
        );
    }
}
