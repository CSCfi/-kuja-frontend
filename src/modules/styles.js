/**
 * Tässä tiedostossa:
 *
 * 1) Määritetään applikaatiolle globaalit tyylit
 * 2) Määritetään tyylielementtejä (värit jne.) joita käytetään komponenteissa
 */

import styled, { injectGlobal } from 'styled-components'

import 'static/fonts/OpenSans-Regular.ttf'
import 'static/fonts/OpenSans-SemiBold.ttf'
import 'static/fonts/GothamNarrow-Book.otf'
import 'static/fonts/GothamNarrow-Light.otf'

// Globaalit tyylit
injectGlobal`
  body {
    margin: 0;
    font-family: Gotham Narrow, Helvetica, Arial, sans-serif;
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

// Colors
export const COLORS = {
  OIVA_GREEN: '#5A8A70',
  DARK_GRAY: '#525252',
  BLACK: '#000000'
}

export const FONT_STACK = {
  GENERAL: `Gotham Narrow, Helvetica, Arial, sans-serif`,
  NAVIGATION: `Open Sans, Helvetica, Arial, sans-serif`
}