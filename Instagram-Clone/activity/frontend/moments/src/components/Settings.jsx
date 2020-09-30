
import axios from 'axios';
import React, { Component } from 'react';
import "./Settings.css"
class Settings extends Component {
    state = { 
        name:"",
        handle:"",
        bio:"",
        profile:"public",
        disabled:true,
        src:""
     }
     fileInputRef=React.createRef();
     imgObj;
     openAddImage=()=>{
         this.fileInputRef.current.click();
     }
     selectImage=()=>{
         // input image in obj form
         this.imgObj=this.fileInputRef.current.files[0];
         // convert to url
         let imgNewSrc=URL.createObjectURL(this.imgObj);
         this.setState({
             src:imgNewSrc
         });
     }
     handleChange=(event)=>{
        let val=event.target.value;
        let prop=event.target.name;
        let stateObj={}
        stateObj[prop]=val;
        this.setState(stateObj);
     }
     handleEdit=(event)=>{
        event.preventDefault();
        this.setState({
            disabled:!this.state.disabled
        })
     }
     handleSubmit= async (event)=>{
        event.preventDefault();
        let formData=new FormData();
        console.log(this.imgObj)
        if(this.imgObj){
            formData.append("user",this.imgObj);
        }
        formData.append("name",this.state.name);
        formData.append("bio",this.state.bio);
        formData.append("is_public",this.state.profile=='public'?1:0);
        let res= await axios.patch("/api/v1/users/ebdu39kkepsl9o7",formData);
        alert(res.data.sucess);
     }
     componentDidMount(){
         axios.get("/api/v1/users/ebdu39kkepsl9o7").then((req)=>{
             let {name,handle,bio,p_img_url}=req.data.user;
             this.setState({
                 name:name,
                 handle:handle,
                 src:p_img_url,
                 bio:bio
             })
         })
     }
    render() { 
        return (
            <div className="container">
                <h2>User Details</h2>
                <div className="img-container">
                    <img src={this.state.src} alt='profile-img' className="profile-img" onClick={this.openAddImage}/>
                    <input type="file" ref={this.fileInputRef} onChange={this.selectImage} />
                </div>
                <form className="profile" onSubmit={this.handleSubmit}>
                    <div className="input__container">
                        <label htmlFor="name">Name</label>
                        <input type='text' value={this.state.name} id="name" name="name" onChange={this.handleChange} disabled={this.state.disabled}/>
                    </div>
                    {/* handle */}
                    <div className="input__container">
                        <label htmlFor="handle">Handle</label>
                        <input type='text' value={this.state.handle} id="handle" name="handle" onChange={this.handleChange} disabled={this.state.disabled}/>
                    </div>
                    {/* bio */}
                    <div className="input__container">
                        <label htmlFor="bio">Bio</label>
                        <input type='text' value={this.state.bio} id="bio" name="bio" onChange={this.handleChange} disabled={this.state.disabled}/>
                    </div>
                    <div className="input__container">
                        <label htmlFor="profile">Profile</label>
                        <select id="profile_" value={this.state.profile} onChange={this.handleChange} name="profile" disabled={this.state.disabled}>
                            <option value="public">public</option>
                            <option value="private">private</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={this.handleEdit}>Edit</button>
                </form>
            </div>
        );
    }
}
 
export default Settings;
