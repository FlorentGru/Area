import React from 'react';
import DropDown from './DropDown'
import GitHubAuth from '../APICalls/Github'

const token = localStorage.getItem("token")

export default class Home extends React.Component {

    callGitHub = async () => {
        const response = await GitHubAuth(token)
        if (response !== 400) {
            localStorage.setItem("GitHubUrl", response)
            console.log(localStorage.getItem("GitHubUrl"))
        } else {
            alert("Can't connect to GitHub")
        }
    }


    disconnect = () => {
        this.props.history.push("/")
    }
    render () {
        this.callGitHub()
        return (
            <div>Home
                <br/>
                <DropDown/>
                <br/>
                {/* <Discord data={data.discord}/> */}
                <button className="menuButton" onClick={this.disconnect}>Disconnect</button>
            </div>
            )
    }
}