import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// APP DU TUTO

// ReactDOM.render(<App />, document.getElementById('root'));

//Tentative de Form en REACT

let Submit = {
    name: "",
    password: "",
    email: ""
}

class MyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: null, password: null, email: null}
    }

    getUsername() {return this.state.username}
    getPassword() {return this.state.password}
    getEmail() {return this.state.email}

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val})
    }
    mySubmitHandler = (event) => {
        event.preventDefault()
        return (`${this.state.username} ${this.state.password} ${this.state.email}`)
        alert(`You are Submitting this username: ${this.state.username} with this password ${this.state.password}`)
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
            <h1>Hello your username is: "{this.state.username}", your password is: "{this.state.password}", your email is: "{this.state.email}"</h1>
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

function displayInfos({username = "", password = "", email = ""})
{
    // return (
    //     <>
    // )
}

ReactDOM.render(
    <MyForm/>,
    // <displayInfos username="MyForm.getPassword" />,
    document.getElementById('root')
)

serviceWorker.unregister();
