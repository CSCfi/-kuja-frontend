/**
 * Tässä tiedostossa:
 *
 * 1) Määritetään applikaatiolle globaalit tyylit
 * 2) Määritetään tyylielementtejä (värit jne.) joita käytetään komponenteissa
 * 3) Määritetään styled-components komponentteja, joita voidaan käyttää applikaatiossa
 */

import styled, { injectGlobal } from 'styled-components'

import 'static/fonts/OpenSans-Regular.ttf'
import 'static/fonts/OpenSans-SemiBold.ttf'
import 'static/fonts/GothamNarrow-Book.otf'
import 'static/fonts/GothamNarrow-Light.otf'

// Colors
export const COLORS = {
  OIVA_GREEN: '#5A8A70',
  DARK_GRAY: '#525252',
  BLACK: '#000000',
  WHITE: '#FFFFFF'
}

export const FONT_STACK = {
  GOTHAM_NARROW: `"Gotham Narrow", Helvetica, Arial, sans-serif`,
  OPEN_SANS_REGULAR: `"Open Sans", Helvetica, Arial, sans-serif`,
  OPEN_SANS_SEMIBOLD: `"Open Sans", Helvetica, Arial, sans-serif`,
  PT_SANS_NARROW: `"PT Sans Narrow", "Times New Roman", sans-serif`
}

export const APP_WIDTH = 1030

// Globaalit tyylit
injectGlobal`
  body {
    margin: 0;
    font-family: ${FONT_STACK.GOTHAM_NARROW};
  }
  
  table {
    //padding: 12px 24px;
    border: 1px solid #D5D5D5;
  }
  
  thead {
    color: ${COLORS.WHITE};
    background: ${COLORS.OIVA_GREEN};
  }
  
  thead {
    th {
    }
  }
  
  tbody {
    tr {
      &:nth-child(even) {
        background: #F9F9F9;
      }
    }
  }

  th {
    font-weight: normal;
    padding: 6px 18px;
  }
  
  h1 {
    font-family: ${FONT_STACK.PT_SANS_NARROW};
    font-size: 40px;
  }
  
  p {
    margin: 11px 0;
  }
  
  a {
    color: ${COLORS.OIVA_GREEN};
    text-decoration: none;
  }
`

export const AppContainer = styled.div`
  width: 100%;
  max-width: ${APP_WIDTH}px;
  margin: 45px auto;
  padding: 15px;
  box-sizing: border-box;
`

export const P = styled.p`
  font-weight: 100;
  font-size: 16px;
  line-height: 22px;
`




