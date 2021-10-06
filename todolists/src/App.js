import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Layout/Navbar';
// import UserItems from './Components/User/UserItems';
import Users from './Components/User/Users';
import axios from 'axios';
import Search from './Components/User/Search';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios
      .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}& client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false })
  }
  //search github users
  searchUsers = async (text) => {
    this.setState({ loading: true }); //to get spinner

    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}& client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false })
  }
  //clear github users
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }


  render() {

    return (
      <div className="App" >
        <Navbar />
        <div className="container" >

          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false} />

          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }

}

export default App;


// client secret
// 8bd24c23fcc14f86c012be6fe861486543a20402