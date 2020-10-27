import React from 'react';

function FollowingUser(props) {
    return (
        <li className="following-user">
            <img 
                className="following-user-image"
                src={props.following.avatar_url}
                alt={`${props.following.login}s' avatar`}    
            />
            <a href={props.following.html_url}>
                <h4 className="following-user-username">{props.following.login}</h4>
            </a>
        </li>
    )
}

export default FollowingUser;