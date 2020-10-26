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
  const searchUser = async(e) => {
      e.preventDefault();
      const url = `https://api.github.com/users/${query}`;
      try {
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
          setUserInfo(data);
      } catch(err) {
          console.error(err);
      }
  }

  return (
    <Router>
      <>
        <Header handleSubmit={searchUser} handleChange={setQuery} query={query}/>
        <div className="container">
          <Route path="/" exact render={() => <Home userInfo={userInfo}/>} />
          <Route path="/following" component={Following} />
        </div>
      </>
    </Router>
  );
}

export default App;
