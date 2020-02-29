import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from './LoginPage/login'
import Home from './Home/home'
import About from './about'
import RegisterPage from './LoginPage/Register'
import DiscordForm from './Home/ActionAndReactionLists/Discord'
import GitHubForm from './Home/ActionAndReactionLists/GitHub'
import GoogleCalendarForm from './Home/ActionAndReactionLists/GoogleCalendar'
import InstagramForm from './Home/ActionAndReactionLists/Instagram'
import MessengerForm from './Home/ActionAndReactionLists/Messenger'
import OneDriveForm from './Home/ActionAndReactionLists/OneDrive'
import OutlookForm from './Home/ActionAndReactionLists/Outlook'

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
