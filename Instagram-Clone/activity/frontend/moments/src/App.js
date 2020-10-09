import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redrict } from 'react-router-dom';
import UserView from './components/user/UserView'
import Login from './components/Login';
import Settings from './components/Settings';
import PageNotFound from './components/PageNotFound'

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <Login></Login>
        </Route>
        <Route path="/profile" exact>
          <div className="app">
            <UserView></UserView>
            <div className="postView">Post View</div>
          </div>
        </Route>
        <Route path="/settings" exact>
          <Settings></Settings>
        </Route>
        <Route>
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default App;
