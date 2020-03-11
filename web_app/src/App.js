import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Home/Home'
import AddressPage from './Adress'
import LoginPage from './LoginPage/Login'
import RegisterPage from './LoginPage/Register'
import SelectAction from './Home/ActionAndReactionLists/Actions/SelectAction'
import SelectReaction from './Home/ActionAndReactionLists/Reactions/SelectReaction'

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={AddressPage}/>
      <Route path="/Home" component={Home}/>
      <Route path="/Login" component={LoginPage}/>
      <Route path="/Register" component={RegisterPage}/>
      <Route path="/SelectAction" component={SelectAction}/>
      <Route path="/SelectReaction" component={SelectReaction}/>
    </Router>
  );
}
