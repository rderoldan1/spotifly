import React, {Component} from "react";
import { connect } from 'react-redux'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Link, Route, Switch, BrowserRouter} from "react-router-dom";

import Login from './Login.jsx'
import NotFound from './NotFound.jsx'
import Search from './Search.jsx'
import Current from './Current.jsx'

class AppRouter extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired 
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      accessToken: cookies.get("access_token") || ""
    };
  }

  loggedIn = () =>{
    return this.state.accessToken.length !== 0
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="header">
            <ul>
              <li>
                SpotifyTest
              </li>
              <li>
                {this.loggedIn() ? <Link to="/search">Search</Link> : <span />}
              </li>
              <li>
                {this.loggedIn() ? <Link to="/current">Current Song</Link> : <span />}
              </li>
              <li>
                {this.loggedIn() ? <a href="/spotify/logout">Logout</a> : <span /> }
              </li>
            </ul>
            <hr />
          </div>
          <div className="main">
            <Switch>      
              <Route exact path="/Search" component={this.loggedIn() ? Search : Login} />
              <Route exact path="/Current" component={this.loggedIn() ? Current : Login} />
              <Route exact path="/" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter> 
    )
  }
}

export default withCookies(AppRouter);