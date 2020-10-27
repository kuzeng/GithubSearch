import './App.css';
import Header from './components/Header/header';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home/home';
import Following from './components/Following/following';
import React, {useState} from 'react';

function App() {
  // states- input query, user
  const [query, setQuery] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [followings, setFollowings] = useState([]);
  const [followingNum, setFollowingNum] = useState(10);

  const searchUser = async(e) => {
      e.preventDefault();
      const url = `https://api.github.com/users/${query}`;
      try {
          const res = await fetch(url);
          const data = await res.json();
          //console.log(data);
          setUserInfo(data);
          
          // get following users
          searchFollowing(followingNum);
          // empty the input field
          
      } catch(err) {
          console.error(err);
      }
  }

  const searchFollowing = async(loadNum) => {
    try {
        const followingUrl = `https://api.github.com/users/${query}/following?page=${1}&per_page=${loadNum}`;
        const followingRes = await fetch(followingUrl);
        const followingData = await followingRes.json();
        setFollowings(followingData);
        //console.log("following", followingData);
    } catch(err) {
      console.error(err);
    }
  }

  const loadMoreUsers = () => {
    searchFollowing(followingNum + 10);
    setFollowingNum(prevNum => prevNum + 10);
  }



  return (
    <Router>
      <>
        <Header handleSubmit={searchUser} handleChange={setQuery} query={query}/>
        <div className="container">
          {
            userInfo.url ?
            <>
              <Route path="/" exact render={() => <Home userInfo={userInfo}/> } />
              <Route path="/following" render={() => <Following 
                                                        totalFollowing={userInfo.following}  
                                                        followings={followings} 
                                                        handleClick={loadMoreUsers} />} />
            </> :
            <h1>Please Search For a User</h1>
          }
        </div>
      </>
    </Router>
  );
}

export default App;
