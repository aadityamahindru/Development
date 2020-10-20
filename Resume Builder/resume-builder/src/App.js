import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/presentation/Header';
import LandingPage from './components/presentation/LandingPage';
// import './App.css';
import './static/scss/App.scss'

function App() {
  return (
    <div className="App">
    <Header></Header>
      <Route path='/' component={LandingPage} />
    </div>
  );
}

export default App;
