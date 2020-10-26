import React from 'react';
import UserProfile from '../UserProfile/userProfile';

function Home(props) {
    return (
        <>  
            <UserProfile userInfo={props.userInfo} />
        </>
    )
}

export default Home;