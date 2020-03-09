import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Algo from "./components/pages/algo/Algo";
import ChartPoint from "./components/pages/chartPoint/ChartPoint";
import Header from "./components/header/Header";

const client = new ApolloClient({
  uri: "https://bitbot-server.herokuapp.com/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <Header/> */}
      <Router>
        <Switch>
          <Router path="/dashboard">
            <Dashboard/>
          </Router>
          <Router path="/algo/:id">
            <Algo/>
          </Router>
          <Router path="/chart-point/:id">
            <ChartPoint/>
          </Router>
          <Route exact path="/">
            <Redirect to={{pathname: "/dashboard"}} />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
