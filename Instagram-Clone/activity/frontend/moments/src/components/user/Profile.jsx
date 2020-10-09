import React from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileMenu from './ProfileMenu'
const Profile = (props) => {
    return (
        <div className="profile">
          <ProfileDetails></ProfileDetails>
          <ProfileMenu changeMenu={props.changeMenu}></ProfileMenu>
        </div>
      )
}
 
export default Profile;