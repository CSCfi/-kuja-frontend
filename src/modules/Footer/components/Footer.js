import React, { Component } from 'react'
import styled from 'styled-components'
import { COLORS, Leijona , MEDIA_QUERIES} from 'modules/styles'

const FooterBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${COLORS.WHITE};
  color: black;
  border-top: 2px solid #70A489;
  padding: 1rem;
  height: auto;
  bottom: 0;
`

const FooterBarUpper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  background: ${COLORS.WHITE};
  font-size:11px;
`

class Footer extends Component {

  render() {

    return (
      <FooterBar>
        <FooterBarUpper maxWidth="1280px">
          <div className="hidden sm:inline">
            <Leijona/>
          </div>
          <div className="rightSide m-6 mr-30 leading-loose">
            <p>OPETUS- JA KULTTUURIMINISTERIÖ</p>
            <p>PL 29, 00023 VALTIONEUVOSTO</p>
            <p>PUH. 029 533 0004, <a href="http://www.minedu.fi">WWW.MINEDU.FI</a></p>
          </div>
        </FooterBarUpper>
      </FooterBar>
    )
  }
}
export default Footer