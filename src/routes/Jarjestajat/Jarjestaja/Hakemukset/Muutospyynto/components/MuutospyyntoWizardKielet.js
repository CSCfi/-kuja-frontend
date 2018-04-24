import React, { Component } from 'react'

import { ContentContainer} from "../../../../../../modules/elements"
import { Kohde, Kohdenumero, Otsikko } from "./MuutospyyntoWizardComponents"

class MuutospyyntoWizardKielet extends Component {
  render() {
    const { lupa } = this.props
    const { kohteet} = lupa
    const { headingNumber, heading } = kohteet[2]
    return (
      <Kohde>
        <ContentContainer>
          <Kohdenumero>{headingNumber}.</Kohdenumero>
          <Otsikko>{heading}</Otsikko>
        </ContentContainer>
      </Kohde>
    )
  }
}

export default MuutospyyntoWizardKielet
