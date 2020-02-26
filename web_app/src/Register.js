import React from 'react';
import registerUser from './APICalls/APIRegister'

const textCenter = {
    "text-align": "center"
}


export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: null, password: null, confirm_password: null, confirm_email: null, email: null, toHome: false}
    }

    returnLoginPage = () => {
        this.props.history.push("/")
    }

    myChangeHandler = (event) => {
        event.preventDefault()
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    }

    mySubmitHandler = async (event) => {
        event.preventDefault()
        let err=0
//        alert(`${this.state.username} ${this.state.password} ${this.state.confirm_password} ${this.state.email} ${this.state.confirm_email}`)
        if (this.state.confirm_password !== this.state.password) {
            alert (`passwords should be identicals ${this.state.confirm_password} && ${this.state.password}`)
            err = 1
        }
        if (this.state.confirm_email !== this.state.email) {
            alert ("emails should be identicals")
            err = 1
        }
        if (err === 0) {
            let status = await registerUser(this.state.username, this.state.password, this.state.email)
            if (status === 201)
                this.props.history.push('/')
        }
    }
    render() {
        return (
            <div>
            <form onSubmit={this.mySubmitHandler} style={textCenter}>
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
            <p>Confirm password</p>
            <input
                type='password'
                name='confirm_password'
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
           <p>Confirm email</p>
            <input
                type='text'
                name='confirm_email'
                required={true}
                onChange={this.myChangeHandler}
            />
 
            <br/>
            <br/>
            <input type="submit" value="Create Account"/>
            <br/>
            <button onClick={this.returnLoginPage}>Return login page</button>
            </form>
            </div>
        );
    }
}
