import React from 'react';
import '../CSS/home.css'

export default class DropDown extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            show: false,
        }

        this.showMenu = this.showMenu.bind(this)
    }

    showMenu = async (event) => {
        event.preventDefault();
        if (this.state.show === true) {
            this.setState({show: false})
        } else {
            this.setState({show: true})
        }
    }

    render() {
        return (
        <div>
            <button className="menuButton" onClick={this.showMenu}>Se connecter à un Service</button>
            {
            this.state.show
                ? (
                <div z-index={10}>
                    <br/>
                    {/* <a className="dropDownButton" href='/LoginDiscord'> Connection Discord</a>
                    <br/><br/><br/> */}
                    <a className="dropDownButton" href={localStorage.getItem("GitHubUrl")}> Connection GitHub</a>
                    <br/><br/><br/>
                    {/* <a className="dropDownButton" href='/LoginSlack'> Connection Google Calendar</a>
                    <br/><br/><br/> */}
                    {/* <a className="dropDownButton" href='/LoginTimer'> Connection Timer</a>
                    <br/><br/><br/> */}
                    {/* <a className="dropDownButton" href='/LoginZoho'> Connection Zoho</a>
                    <br/><br/><br/> */}
                    <a className="dropDownButton" href={localStorage.getItem("DropBoxUrl")}> Connection DropBox</a>
                    <br/><br/><br/>
                        {/* <a className="dropDownButton" href='/LoginGmail'> Connection Gmail</a> */}
                </div>) : (null)
            }
            <div></div>
        </div>
        );
    }
}