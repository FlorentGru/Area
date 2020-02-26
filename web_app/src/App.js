import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from './login'
import Home from './home'
import About from './about'
import RegisterPage from './Register'
import DiscordForm from './ConnectionForms/Discord'
import GitHubForm from './ConnectionForms/GitHub'
import GoogleCalendarForm from './ConnectionForms/GoogleCalendar'
import InstagramForm from './ConnectionForms/Instagram'
import MessengerForm from './ConnectionForms/Messenger'
import OneDriveForm from './ConnectionForms/OneDrive'
import OutlookForm from './ConnectionForms/Outlook'

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage}/>
      <Route path="/Home" component={Home}/>
      <Route path="/about.json" component={About}/>
      <Route path="/Register" component={RegisterPage}/>
      <Route path="/LoginDiscord" component={DiscordForm}/>
      <Route path="/LoginGitHub" component={GitHubForm}/>
      <Route path="/LoginGoogleCalendar" component={GoogleCalendarForm}/>
      <Route path="/LoginInstagram" component={InstagramForm}/>
      <Route path="/LoginMessenger" component={MessengerForm}/>
      <Route path="/LoginOneDrive" component={OneDriveForm}/>
      <Route path="/LoginOutlook" component={OutlookForm}/>
    </Router>
  );
}
