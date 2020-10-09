import React, { Component } from 'react';
import Profile from './Profile'
import axios from 'axios';
import MenuList from './MenuList'
class UserView extends Component {
    state = {
        cMenu: "suggestions",
        list: []
    }
    changeMenu = async (nMenu) => {
        let obj = await axios.get("/api/v1/users/fr/ebdu1kckese771x");
        let uFollArr = [];
        if (nMenu == "followers") {
            uFollArr = obj.data.message.filter(follower => follower.is_pending == 0);
        } else if (nMenu == "request") {
            uFollArr = obj.data.message.filter(follower => follower.is_pending == 1);
        }
        this.setState({
            list: uFollArr,
            cMenu: nMenu
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

export default UserView;