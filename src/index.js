import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
import styled, { injectGlobal } from 'styled-components'

import Navigaatio from './components/Navigaatio'
import reducers from './reducers'
import Luvat from './components/Luvat'
import Etusivu from './components/Etusivu'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

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
        </ContentWrapper>
      </RootDiv>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
