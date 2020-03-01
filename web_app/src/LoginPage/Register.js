import React from 'react';
import registerUser from '../APICalls/APIRegister'
import '../CSS/login.css'
import logoDiscord from '../logo/discord.png'
import logoGitHub from '../logo/github.png'
import logoSlack from '../logo/slack.png'
import logoInstagram from '../logo/instagram.png'
import logoMessenger from '../logo/messenger.svg'
import logoDropBox from '../logo/dropbox.png'
import logoGmail from '../logo/gmail.png'

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {password: null, confirm_password: null, confirm_email: null, email: null}
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
        let err = 0
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
            <form onSubmit={this.mySubmitHandler} className="formStyle">
            <h1>Area</h1>
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
            <img src={logoDiscord} className="imgDiscord" alt=""></img>
            <img src={logoGitHub} className="imgGitHub" alt=""></img>
            <img src={logoSlack} className="imgSlack" alt=""></img>
            <img src={logoInstagram} className="imgInstagram" alt=""></img>
            <img src={logoMessenger} className="imgMessenger" alt=""></img>
            <img src={logoDropBox} className="imgDropBox" alt=""></img>
            <img src={logoGmail} className="imgGmail" alt=""></img> 
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
