import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import store from 'helpers/Store'
import Navigaatio from 'components/Navigaatio'
import Routes from 'components/Routes'
import { APP_WIDTH } from 'helpers/Constants'

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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootDiv>
        <Navigaatio maxWidth={`${APP_WIDTH}`}/>
        <Routes />
      </RootDiv>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
