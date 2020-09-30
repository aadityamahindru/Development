import axios from "axios";
import React, { Component } from 'react';
class ProfileDetails extends Component {
    state = {
        src: "",
        name: "",
        handle: "",
        post: "",
        followers: "",
        following: ""
    }
    componentDidMount(){
        axios.get("/api/v1/users/ebdu1kckese771x").then((res)=>{
            let{name,handle,p_img_url}=res.data.user;
            this.setState({
                name:name,
                src:"",
                handle:handle
            })
        }).then(()=>{
            let followers=axios.get("/api/v1/users/fr/ebdu1kckese771x");
            return followers
        }).then((followers)=>{
            let follower=followers.data.message.length;
            this.setState({followers:follower});
        })
    }
    render() {
        let { src, name, handle, post, followers, following } = this.state;
        return (
            <div className="profile-details">
                <div className="profile-subpart">
                    <h1>Profile</h1>
                    <img src={src} alt="profile-img" />
                    <div className="name">{name}</div>
                    <div className="handle">{handle}</div>
                </div>
                <div className="profile-stats">
                    <div className="post">
                        <p>{post}</p>
                        <div>Post</div>
                    </div>
                    <div className="follower">
                        <p>{followers}</p>
                        <div>Followers</div>
                    </div>
                    <div className="following">
                        <p>{following}</p>
                        <div>following</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileDetails
