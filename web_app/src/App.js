import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from './login'
import Home from './home'
import About from './about'
import RegisterPage from './Register'


export default function App() {
  return (
    <Router>
      <div>
          {/* <ul>
            <li>
              <Link to="/">LoginPage</Link>
            </li>
            <li>
              <Link to="/about.json">About</Link>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
          </ul> */}
          <Route exact path="/" component={LoginPage}/>
          <Route path="/Home" component={Home}/>
          <Route path="/about.json" component={About}/>
          <Route path="/Register" component={RegisterPage}/>

      </div>
    </Router>
  );
}
