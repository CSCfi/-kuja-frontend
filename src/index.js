import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, NavLink } from 'react-router-dom'
import { BreadcrumbsProvider, Breadcrumbs } from 'react-breadcrumbs-dynamic'

import 'modules/polyfills'
import store from 'store'
import Header from 'modules/Header/containers/HeaderContainer'
import Routes from 'routes'
import { AppContainer, BreadcrumbsContainer, COLORS, APP_WIDTH } from 'modules/styles'

ReactDOM.render(
  <Provider store={store}>
    <BreadcrumbsProvider>
      <BrowserRouter>
        <div>
          <Header maxWidth={`${APP_WIDTH}`}/>
          <AppContainer>
            <BreadcrumbsContainer>
              <Breadcrumbs
                separator={<b> / </b>}
                item={NavLink}
                finalItem={'b'}
                finalProps={{
                  style: {
                    color: COLORS.BLACK
                  }
                }}
              />
            </BreadcrumbsContainer>
            <Routes />
          </AppContainer>
        </div>
      </BrowserRouter>
    </BreadcrumbsProvider>
  </Provider>,
  document.getElementById("root")
)
