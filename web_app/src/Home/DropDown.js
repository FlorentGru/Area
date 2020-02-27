import React from 'react';
import '../CSS/home.css'

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            show: false,
        }
        
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    
    showMenu(event) {
        event.preventDefault();        
        this.setState({ show: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
        
    closeMenu(event) {
        event.preventDefault();
        this.setState({ show: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        return (
        <div>
            <button className="menuButton" onClick={this.showMenu}>
            Se connecter à un Service
            </button>
            
            {
            this.state.show
                ? (
                <div className="menu">
                    <button className="menuButton" onClick={this.disconnect}> Connection Discord</button>
                    <button className="menuButton"> Connection GitHub</button>
                    <button className="menuButton"> Connection Google Calendar</button>
                    <button className="menuButton"> Connection Instagram</button>
                    <button className="menuButton"> Connection Messenger</button>
                    <button className="menuButton"> Connection OneDrive</button>
                    <button className="menuButton"> Connection Outlook</button>
                </div>
                )
                : (
                null
                )
            }
        </div>
        );
    }
}