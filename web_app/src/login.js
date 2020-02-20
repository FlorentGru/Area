import React from 'react';
import Submit from './sumbit'
import loginUser from './APICalls/APILogin'
import RegisterUser from './APICalls/APIRegister'

const textCenter = {
    "text-align": "center"
}

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: null, password: null, email: null, toHome: false}
    }

    mySubmitHandlerLoggin = (event) => {
        event.preventDefault()
        Submit.name = this.state.username
        Submit.password = this.state.password
        Submit.email = this.state.email
        loginUser(this.state.email, this.state.password);
        this.props.history.push('/Home')
    }
    mySumbitHandlerRegister = () => {
        this.props.history.push('/Register')
    }
    render() {
        return (
            <p>
            <form onSubmit={this.mySubmitHandlerLoggin} style={textCenter}>
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
            <p>Enter your email</p>
            <input
                type='text'
                name='email'
                required='true'
            />
            <br/>
            <br/>
            <input type="submit" value="Loggin"/>
            </form>
            <form onSubmit={this.mySumbitHandlerRegister} style={textCenter}>
                <input type="submit" value="Create New Account"/>
            </form>
            </p>
        );
    }
}
