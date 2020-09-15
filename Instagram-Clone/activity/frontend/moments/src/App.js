import './App.css';
import ProfileDetails from './components/user/ProfileDetails';
import React from 'react';
function Profile() {
  return (
    <div className="profile">
      <ProfileDetails></ProfileDetails>
    </div>
  )
}
function UserView() {
  return (
    <div className="userView">
      <Profile></Profile>
      <div className="menu-list"></div>
    </div>
  )
}
function App() {
  return (
    <div className="app">
      <UserView></UserView>
      <div className="postView">Post View</div>
    </div>
  )
}

export default App;
