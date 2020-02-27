import React from 'react';
import loginUser from '../APICalls/APILogin'
import '../CSS/login.css'

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
        let response = await loginUser(this.state.email, this.state.password);
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token)
            this.props.history.push('/Home')
        }
    }
    mySumbitHandlerRegister = (event) => {
        event.preventDefault()
        this.props.history.push('/Register')
    }
    render() {
        return (
            <div>
            <form onSubmit={this.mySubmitHandlerLoggin} className="formStyle">
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
            <form onSubmit={this.mySumbitHandlerRegister} className="formStyle">
                <input type="submit" value="Create New Account"/>
            </form>
            </div>
        );
    }
}
