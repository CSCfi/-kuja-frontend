import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import store from 'store'
import Header from 'modules/Header/containers/HeaderContainer'
import Routes from 'routes'
import { APP_WIDTH } from 'modules/constants'

// Globaalit tyylit
injectGlobal`
  body {
    margin: 0;
  }
`

// Applikaation tason tyylit
const RootDiv = styled.div`
  font-family: Roboto, Helvetica, Arial, sans-serif;

  h1 {
    
  }
  
  thead {
    th {
      font-weight: bold;
    }
  }

  th {
    font-weight: normal;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootDiv>
        <Header maxWidth={`${APP_WIDTH}`}/>
        <Routes />
      </RootDiv>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
