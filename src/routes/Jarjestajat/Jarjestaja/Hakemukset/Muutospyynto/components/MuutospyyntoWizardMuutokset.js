import React, { Component } from 'react'

import MuutospyyntoWizardTutkinnot from './MuutospyyntoWizardTutkinnot'
import MuutospyyntoWizardOpetuskieletContainer from '../containers/MuutospyyntoWizardOpetuskieletContainer'
import MuutospyyntoWizardTutkintokieletContainer from '../containers/MuutospyyntoWizardTutkintokieletContainer'
import MuutospyyntoWizardToimialueContainer from '../containers/MuutospyyntoWizardToimialueContainer'
import MuutospyyntoWizardOpiskelijavuodet from './MuutospyyntoWizardOpiskelijavuodet'
import MuutospyyntoWizardMuutContainer from '../containers/MuutospyyntoWizardMuutContainer'
import { Button, SubtleButton, Kohde, WizardBottom, Container } from "./MuutospyyntoWizardComponents"

class MuutospyyntoWizardMuutokset extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }
  }

  render() {
    const {
      onSubmit,
      previousPage,
      onCancel,
      lupa,
      fetchKoulutusalat,
      fetchKoulutuksetAll,
      fetchKoulutuksetMuut,
      fetchKoulutus
    } = this.props

    return (
      <div>
        <form onSubmit={onSubmit}>
          <MuutospyyntoWizardTutkinnot
            lupa={lupa}
            fetchKoulutusalat={fetchKoulutusalat}
            fetchKoulutuksetAll={fetchKoulutuksetAll}
            fetchKoulutuksetMuut={fetchKoulutuksetMuut}
            fetchKoulutus={fetchKoulutus}
          />

          <Kohde>
            <MuutospyyntoWizardOpetuskieletContainer
              lupa={lupa}
            />

            <MuutospyyntoWizardTutkintokieletContainer
              lupa={lupa}
            />
          </Kohde>

          <Kohde>
            <MuutospyyntoWizardToimialueContainer
              lupa={lupa}
            />
          </Kohde>

          <Kohde>
            <MuutospyyntoWizardOpiskelijavuodet
              lupa={lupa}
            />
          </Kohde>

          <Kohde>
            <MuutospyyntoWizardMuutContainer
              lupa={lupa}
            />
          </Kohde>

          <WizardBottom>
            <Container maxWidth="1085px" padding="15px">
              <Button className="previous button-left button-hidden">Edellinen</Button>
              <div>
                <SubtleButton disabled>Tallenna luonnos</SubtleButton>
              </div>
              <Button type="submit" className="next button-right">Seuraava</Button>
            </Container>
          </WizardBottom>
        </form>
      </div>
    )

  }
}

export default MuutospyyntoWizardMuutokset
