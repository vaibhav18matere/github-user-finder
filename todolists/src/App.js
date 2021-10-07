import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Layout/Navbar';
// import UserItems from './Components/User/UserItems';
import Users from './Components/User/Users';
import axios from 'axios';
import Search from './Components/User/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/pages/About';
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

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
  //set alert when user not enter anything and try searching 
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 3000)
  };

  render() {
    const { users, loading } = this.state; //destructuring
    return (
      <Router>
        <div className="App" >
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
            </Switch>

          </div>
        </div>
      </Router>
    );
  }

}

export default App;
