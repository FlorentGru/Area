import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from './LoginPage/login'
import Home from './Home/home'
import AddressPage from './Adress'
import RegisterPage from './LoginPage/Register'
import CreateAREA from './Home/Area'
import DiscordForm from './Home/ActionAndReactionLists/Discord'
import GitHubForm from './Home/ActionAndReactionLists/GitHub'
import SlackForm from './Home/ActionAndReactionLists/Slack'
import TimerForm from './Home/ActionAndReactionLists/Timer'
import ZohoForm from './Home/ActionAndReactionLists/Zoho'
import DropBoxForm from './Home/ActionAndReactionLists/DropBox'
import GmailForm from './Home/ActionAndReactionLists/Gmail'

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={AddressPage}/>
      <Route path="/Home" component={Home}/>
      <Route path="/Login" component={LoginPage}/>
      <Route path="/Register" component={RegisterPage}/>
      <Route path="/LoginDiscord" component={DiscordForm}/>
      <Route path="/LoginGitHub" component={GitHubForm}/>
      <Route path="/LoginSlack" component={SlackForm}/>
      <Route path="/LoginTimer" component={TimerForm}/>
      <Route path="/LoginZoho" component={ZohoForm}/>
      <Route path="/LoginDropBox" component={DropBoxForm}/>
      <Route path="/LoginGmail" component={GmailForm}/>
      <Route path="/CreateAREA" component={CreateAREA}/>
    </Router>
  );
}
