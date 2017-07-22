import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Registration from './Registration';
import ToDo from './ToDo';
import './index.css';
import firebase from 'firebase'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

 var config = {
    apiKey: "AIzaSyBJWx30A5paj_XhQZUlERc1NLI_uPJ0a60",
    authDomain: "todo-642e1.firebaseapp.com",
    databaseURL: "https://todo-642e1.firebaseio.com",
    projectId: "todo-642e1",
    storageBucket: "todo-642e1.appspot.com",
    messagingSenderId: "802671434795"
  };
  firebase.initializeApp(config);

ReactDOM.render(
   <Router>
    <div className="container">

        <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand">Best To-Do List</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><NavLink to='/Login' activeClassName="selected">Log In</NavLink></li>
              <li><NavLink to='/Registration' activeClassName="selected">Registration</NavLink></li>
              <li><NavLink to='/ToDo' activeClassName="selected">ToDo</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <Route exact path="/Login" component={Login} history={history}/>
      <Route path="/Registration" component={Registration}/>
      <Route path="/ToDo" component={ToDo} history={history} />

    </div>
  </Router>,
  document.getElementById('root')
);
