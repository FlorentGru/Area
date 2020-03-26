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
import GitHubAuth from '../APICalls/Github'
import DropBoxAuth from '../APICalls/DropBox'
import SpotifyAuth from '../APICalls/Spotify'

const setGitHubUrl = async () => {
    const response = await GitHubAuth(localStorage.getItem("token"))
    if (response === 400) {
        console.log("Can't connect to GitHub")
    } else {
        localStorage.setItem("GitHubUrl", response)
    }
}

const setDropBoxUrl = async () => {
    const response = await DropBoxAuth(localStorage.getItem("token"))
    if (response === 400) {
        console.log("Can't connect to DropBox")
    } else {
        localStorage.setItem("DropBoxUrl", response)
    }
}

const setSpotifyUrl = async () => {
    const response = await SpotifyAuth(localStorage.getItem("token"))
    if (response === 400) {
        console.log("Can't connect to Spotify")
    } else {
        localStorage.setItem("SpotifyUrl", response)
    }
}

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
            localStorage.setItem("token", response.data.data)
            setGitHubUrl()
            setDropBoxUrl()
            setSpotifyUrl()
            this.props.history.push('/Home')
        }
    }
    mySumbitHandlerRegister = (event) => {
        event.preventDefault()
        this.props.history.push('/Register')
    }
    mySubmitHandlerNgrok = (event) => {
        event.preventDefault()
        localStorage.removeItem("address")
        this.props.history.push('/')
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
            <form onSubmit={this.mySubmitHandlerNgrok} className="formStyle">
                <input type="submit" value="Change Ngrok"/>
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