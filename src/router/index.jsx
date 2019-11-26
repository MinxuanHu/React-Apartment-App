import React from 'react'
import {HashRouter,Route,Redirect,Switch} from "react-router-dom";
import  main from '../view/main.jsx'
import weatherHours from "../view/weatherDetail.jsx";

class RouteMap extends React.Component {
  render() {
    return (
      <HashRouter>
        <main>
          <Switch>
            <Route path="/main" exact component={main}/>
            <Route path="/weatherDetail" exact component={weatherHours}/>
            <Redirect to='/main' />
          </Switch>
        </main>
      </HashRouter>
    )
  }
}

export default RouteMap