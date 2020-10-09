import React from 'react';
const MenuList = (props) => {
    let { list } = props;
    return (
        <div className="menu-list">
            {
                list.map((follower) => {
                    return (
                        <div>
                            <img src={follower.p_img_url} alt="profile-img" />
                            <div>{follower.name}</div>
                            <div>{follower.handle}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MenuList;