import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
import UserItems from './Components/User/UserItems';
import Users from './Components/User/Users';

class App extends Component {

  componentDidMount() {

  }

  render() {

    return (
      <div className="App" >
        <Navbar />
        <div className="container" >
          <Users />
        </div>
      </div>
    );
  }

}

export default App;
