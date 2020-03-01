import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from './LoginPage/login'
import Home from './Home/home'
import RegisterPage from './LoginPage/Register'
import DiscordForm from './Home/ActionAndReactionLists/Discord'
import GitHubForm from './Home/ActionAndReactionLists/GitHub'
import SlackForm from './Home/ActionAndReactionLists/Slack'
import InstagramForm from './Home/ActionAndReactionLists/Instagram'
import MessengerForm from './Home/ActionAndReactionLists/Messenger'
import DropBoxForm from './Home/ActionAndReactionLists/DropBox'
import GmailForm from './Home/ActionAndReactionLists/Gmail'

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage}/>
      <Route path="/Home" component={Home}/>
      <Route path="/Register" component={RegisterPage}/>
      <Route path="/LoginDiscord" component={DiscordForm}/>
      <Route path="/LoginGitHub" component={GitHubForm}/>
      <Route path="/LoginSlack" component={SlackForm}/>
      <Route path="/LoginInstagram" component={InstagramForm}/>
      <Route path="/LoginMessenger" component={MessengerForm}/>
      <Route path="/LoginDropBox" component={DropBoxForm}/>
      <Route path="/LoginGmail" component={GmailForm}/>
    </Router>
  );
}
