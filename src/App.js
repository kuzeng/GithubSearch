import './App.css';
import Header from './components/Header/header';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home/home';
import Following from './components/Following/following';
import React, {useState} from 'react';
import axios from 'axios';

function App() {
  // states- input query, user
  const [query, setQuery] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [followings, setFollowings] = useState([]);
  const [followingNum, setFollowingNum] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");

  const searchUser = async(e) => {
      e.preventDefault();
      setErrorMessage("");
      const url = `https://api.github.com/users/${query}`;
      try {
          const res = await axios.get(url);
          const data = res.data;
          console.log(data);
          setUserInfo(data);
          
          // get following users
          searchFollowing(followingNum);
          // empty the input field
          
      } catch(err) {
          console.error(err.message);
          setErrorMessage(err.message);
      }
  }

  const searchFollowing = async(loadNum) => {
    try {
        const followingUrl = `https://api.github.com/users/${query}/following?page=${1}&per_page=${loadNum}`;
        const followingRes = await axios.get(followingUrl);
        const followingData = followingRes.data;
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
            userInfo.url ? (
              errorMessage ? 
              <h1>Can't find the user. Please try again</h1> :
              <>
              <Route path="/" exact render={() => <Home userInfo={userInfo}/> } />
              <Route path="/following" render={() => <Following 
                                                        totalFollowing={userInfo.following}  
                                                        followings={followings} 
                                                        handleClick={loadMoreUsers} />} />
            </> 
            ) :
            <h1>Please search for a user</h1>
          }
        </div>
      </>
    </Router>
  );
}

export default App;
