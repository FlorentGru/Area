import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import LoginPage from './login'
import Home from './home'
import About from './about'


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">LoginPage</Link>
            </li>
            <li>
              <Link to="/about.json">About</Link>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about.json">
            <About />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
