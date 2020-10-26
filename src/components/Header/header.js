import React from 'react';
import NavBar from '../NavBar/navBar';

function Header(props) {

    return (
        <header>
            <h1 className="title">Github Search</h1>
            <NavBar />
            <form className="searchWrapper" onSubmit={(e) => props.handleSubmit(e)}>
                <input 
                    type="text" 
                    name="query" 
                    value={props.query} 
                    className="searchBar" 
                    placeholder="Search User..." 
                    onChange={(e) => props.handleChange(e.target.value)}
                />
                <button type="submit" className="button">Search</button>
            </form>
        </header>
    )   
}

export default Header;


