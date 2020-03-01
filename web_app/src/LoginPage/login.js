import React from 'react';
import loginUser from '../APICalls/APILogin'
import '../CSS/login.css'
import logoDiscord from '../logo/discord.png'
import logoGitHub from '../logo/github.png'
import logoSlack from '../logo/slack.png'
import logoTimer from '../logo/timer.png'
import logoZoho from '../logo/zoho.png'
import logoDropBox from '../logo/dropbox.png'
import logoGmail from '../logo/gmail.png'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {password: null, email: null, toHome: false}
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
            <p>Enter your email</p>
            <input
                type='text'
                name='email'
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
            <br/>
            <br/>
            <input type="submit" value="Loggin"/>
            </form>
            <form onSubmit={this.mySumbitHandlerRegister} className="formStyle">
                <input type="submit" value="Create New Account"/>
            </form>
            <img src={logoDiscord} className="imgDiscord" alt=""></img>
            <img src={logoGitHub} className="imgGitHub" alt=""></img>
            <img src={logoSlack} className="imgSlack" alt=""></img>
            <img src={logoTimer} className="imgTimer" alt=""></img>
            <img src={logoZoho} className="imgZoho" alt=""></img>
            <img src={logoDropBox} className="imgDropBox" alt=""></img>
            <img src={logoGmail} className="imgGmail" alt=""></img>
            </div>
        );
    }
}
