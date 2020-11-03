import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Contact from './components/presentation/Contact';
import Education from './components/presentation/Education';
import FinalizePage from './components/presentation/FinalizePage';
import Footer from './components/presentation/Footer';
import GettingStarted from './components/presentation/GettingStarted';
import Header from './components/presentation/Header';
import LandingPage from './components/presentation/LandingPage';
// import './App.css';
import './static/scss/App.scss'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route path='/getting-started' component={GettingStarted} />
        <Route path='/contact' component={Contact}/>
        <Route path='/education'component={Education}/>
        <Route path='/finalize' component={FinalizePage}/>
        <Route path='/' component={LandingPage} />
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
