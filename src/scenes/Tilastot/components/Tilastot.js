import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import { ContentContainer } from '../../../modules/elements'

const Linkki = styled.div`
    margin-top:15px;  
`

class Tilastot extends Component {
  render() {
    return (
      <ContentContainer>
        <Helmet height="50px">
           <title>Oiva | Tilastot</title>
        </Helmet>
          <p>
            Linkkejä tilastodataan (beta-versio):
          </p>
          <Linkki><a href="https://app.powerbi.com/view?r=eyJrIjoiN2M1YWZiYzUtOTEyYS00NTY2LTgzNDctNGZjOTVmOWQ4ZTlkIiwidCI6IjkxMDczODlkLTQ0YjgtNDcxNi05ZGEyLWM0ZTNhY2YwMzBkYiIsImMiOjh9" target="_blank" rel="noopener noreferrer">Ammatillisen koulutuksen järjestämisluvat</a></Linkki>
          <Linkki><a href="https://app.powerbi.com/view?r=eyJrIjoiNjQ4NGRmNWEtYmRmMC00YWNkLWI4NGEtNDg2NTBmMWFmYTM0IiwidCI6IjkxMDczODlkLTQ0YjgtNDcxNi05ZGEyLWM0ZTNhY2YwMzBkYiIsImMiOjh9" target="_blank" rel="noopener noreferrer">Väestötiedot</a></Linkki>

      </ContentContainer>
    )
  }
}

export default Tilastot
