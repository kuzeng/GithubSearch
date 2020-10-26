import React from 'react';

function UserProfile(props) {
    

    return (
        <div className="card">
            <img 
                className="card--image" 
                src={props.userInfo.avatar_url}
                alt={`${props.userInfo.name}s' profile`}
            />
            <div className="card--content">
                <h3 className="card--title">{props.userInfo.login}</h3>
                <p className="description">public repos: {props.userInfo.public_repos} </p>
                <p className="description">{props.userInfo.following} followings</p>
                <p className="description">{props.userInfo.followers} followers</p>
            </div>
        </div>
    )
}

export default UserProfile;