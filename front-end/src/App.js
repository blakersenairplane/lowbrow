import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import FrontPage from "./Pages/FrontPage"
import Submit from "./Pages/Submit"
import About from "./Pages/About"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/">FrontPage </Link></li>
                <li><Link to="/submit">Submit </Link></li>
                <li><Link to="/about">About </Link></li>
              </ul>
              
            </nav>
            
            
            <Route exact path="/" component={()=> <FrontPage/>} />
            <Route path="/submit" component={()=> <Submit/>} />
            <Route path="/about" component={()=> <About/>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
