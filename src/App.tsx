import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import QueryBasics from './features/queries/QueryBasics';
import DependentQueries from './features/dependent-queries/DependentQueries';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/queries">Queries</Link>
              </li>
              <li>
                <Link to="/dependent-queries">Dependent Queries</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/queries">
              <QueryBasics />
            </Route>
            <Route path="/dependent-queries">
              <DependentQueries />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
