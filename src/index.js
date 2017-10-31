import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
import styled, { injectGlobal } from 'styled-components'
import logger from 'redux-logger'

import reducers from './reducers'
import Navigaatio from './components/Navigaatio'
import Luvat from './components/Luvat'
import Etusivu from './components/Etusivu'
import TilastotJaRaportit from './components/TilastotJaRaportit'
import Kirjautuminen from './components/Login'
import SignOut from './components/SignOut'
import { LOGIN_REDIRECT_URL } from './helpers/Constants'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk, logger))
const store = createStore(reducers, enhancer)

const appWidth = 1280

// Globaalit tyylit
injectGlobal`
  body {
    margin: 0;
  }
`

// Applikaation tason tyylit
const RootDiv = styled.div`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  
  thead {
    th {
      font-weight: bold;
    }
  }

  th {
    font-weight: normal;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: ${appWidth}px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
`

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootDiv>
        <Navigaatio maxWidth={`${appWidth}`}/>
        <ContentWrapper>
          <Route path="/" component={Etusivu} exact />
          <Route path="/luvat" component={Luvat} />
          <Route path="/tilastot-raportit" component={TilastotJaRaportit} />
          <Route path="/kirjaudu" component={Kirjautuminen} />
          <Route path="/kirjaudu-ulos" component={SignOut} />
          <Route path="/cas-auth" render={() => { window.location = LOGIN_REDIRECT_URL }} />
        </ContentWrapper>
      </RootDiv>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
