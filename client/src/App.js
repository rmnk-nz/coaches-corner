import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import User from './pages/User';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/user' component={User} />
        </Switch>
      </>
    </Router>
  </ApolloProvider>
  );
}

export default App;
