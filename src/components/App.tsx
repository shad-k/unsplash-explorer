import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import Home from '../pages/Home';

const Main = styled.main`
  height: 100%;
  width: 100%;
`;

function App() {
  return (
    <Main>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Main>
  );
}

export default App;
