import './App.css';
import ProfileDetails from './components/user/ProfileDetails';
import React, { Component } from 'react';
// import React from 'react';
import axios from 'axios';
function ProfileMenu(props) {
  let { changeMenu } = props;
  return (
    <div className="profile-menu">

      <div className="suggestion" onClick={() => {
        changeMenu("suggestion")
      }}>suggestion</div>
      <div className="request" onClick={() => {
        changeMenu("request")
      }}> request</div>
      <div className="follower" onClick={() => {
        changeMenu("followers")
      }}>follower</div>
    </div>
  );
}
function Profile(props) {
  return (
    <div className="profile">
      <ProfileDetails></ProfileDetails>
      <ProfileMenu changeMenu={props.changeMenu}></ProfileMenu>
    </div>
  )
}
class UserView extends Component {
  state = {  
    cMenu:"suggestions",
    list:[]
  }
  changeMenu= async (nMenu)=>{
    let obj= await axios.get("/api/v1/users/fr/ebdu1kckese771x");
    let uFollArr=[];
    if(nMenu=="followers"){
      uFollArr=obj.data.message.filter(follower=>follower.is_pending==0);
    }else if(nMenu=="request"){
      uFollArr=obj.data.message.filter(follower=>follower.is_pending==1);
    }
    this.setState({
      list:uFollArr,
      cMenu:nMenu
    })
  }
  render() { 
    return (
      <div className="userView">
        <Profile changeMenu={this.changeMenu}></Profile>
        <MenuList list={this.state.list}></MenuList>
      </div>
    );
  }
}
function MenuList(props){
  let{list}=props;
  return(
    <div className="menu-list">
      {
        list.map((follower)=>{
          return(
            <div>
            <img src={follower.p_img_url} alt="profile-img"/>
            <div>{follower.name}</div>
            <div>{follower.handle}</div>
          </div>
          )
        })
      }
    </div>
  );
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
