import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from 'store'
import { RootDiv } from 'modules/styles'
import Header from 'modules/Header/containers/HeaderContainer'
import Routes from 'routes'
import { APP_WIDTH } from 'modules/constants'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header maxWidth={`${APP_WIDTH}`}/>
        <Routes />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
