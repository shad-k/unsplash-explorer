import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import theme from '../theme'

import Home from '../pages/Home'

const Main = styled.main`
  height: 100%;
  width: 100%;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Main>
    </ThemeProvider>
  )
}

export default App
