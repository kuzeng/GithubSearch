import React from 'react';
import FollowingUser from '../FollowingUser/FollowingUser';

function Following(props) {
    const {followings, totalFollowing, handleClick} = props;
    return (
        <div className="following-list">  
            <h1>{followings.length} / {totalFollowing} {+followings.length > 1 ? "Followings" : "Following"}</h1>
            <ul>
                {followings.map(following => (
                    <FollowingUser key={following.id} following={following} />
                ))}
            </ul>
            {totalFollowing > 10 && followings.length < totalFollowing && <button className="button" onClick={() => handleClick()}>Load More...</button>}
        </div>
    )
}

export default Following;