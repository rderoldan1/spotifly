import React from "react";
import { Link, Route, Switch, BrowserRouter} from "react-router-dom";
import Login from './Login.jsx'
import NotFound from './NotFound.jsx'
import Search from './Search.jsx'
import Current from './Current.jsx'

const AppRouter = () => (  
  <BrowserRouter>
    <div>
      <div className="header">
        <ul>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/current">Current Song</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <hr />
      </div>
      <div className="main">
        <Switch>      
          <Route exact path="/Search" component={Search} />
          <Route exact path="/Current" component={Current} />
          <Route exact path="/Login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </BrowserRouter> 
);

export default AppRouter;