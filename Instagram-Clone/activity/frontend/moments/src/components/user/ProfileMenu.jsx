import React from 'react';
const ProfileMenu = (props) => {
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
 
export default ProfileMenu;