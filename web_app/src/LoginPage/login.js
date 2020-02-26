import React from 'react';
import loginUser from '../APICalls/APILogin'

const textCenter = {
    "textAlign": "center"
}

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: null, password: null, email: null, toHome: false}
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandlerLoggin = async (event) => {
        event.preventDefault()
        let status = await loginUser(this.state.email, this.state.password);
        if (status === 200)
            this.props.history.push('/Home')
    }
    mySumbitHandlerRegister = (event) => {
        event.preventDefault()
        this.props.history.push('/Register')
    }
    render() {
        return (
            <div>
            <form onSubmit={this.mySubmitHandlerLoggin} style={textCenter}>
            <h1>Area</h1>
            <p>Enter your name:</p>
            <input
                type='text'
                name='username'
                required={true}
                onChange={this.myChangeHandler}
            />
            <p>Enter your password</p>
            <input
                type='password'
                name='password'
                required={true}
                onChange={this.myChangeHandler}
            />
            <p>Enter your email</p>
            <input
                type='text'
                name='email'
                required={true}
                onChange={this.myChangeHandler}
            />
            <br/>
            <br/>
            <input type="submit" value="Loggin"/>
            </form>
            <form onSubmit={this.mySumbitHandlerRegister} style={textCenter}>
                <input type="submit" value="Create New Account"/>
            </form>
            </div>
        );
    }
}
