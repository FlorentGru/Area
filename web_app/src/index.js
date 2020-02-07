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

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val})
    }
    mySubmitHandler = (event) => {
        event.preventDefault()
        Submit.name = this.state.username;
        Submit.password = this.state.password;
        Submit.email = this.state.email;
        displayInfos();
        return (`${this.state.username} ${this.state.password} ${this.state.email}`)
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

function displayInfos()
{
    console.log(`${Submit.name} ${Submit.password} ${Submit.email}`);
}

ReactDOM.render(
    <MyForm/>,
    // <displayInfos username = {Submit.name} password = {Submit.password} email = {Submit.email}/>,
    document.getElementById('root')
)

serviceWorker.unregister();
