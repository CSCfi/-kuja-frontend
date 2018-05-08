import React, { Component } from 'react'

import MuutospyyntoWizardTutkinnot from './MuutospyyntoWizardTutkinnot'
import MuutospyyntoWizardOpetuskieletContainer from '../containers/MuutospyyntoWizardOpetuskieletContainer'
import MuutospyyntoWizardTutkintokieletContainer from '../containers/MuutospyyntoWizardTutkintokieletContainer'
import MuutospyyntoWizardToimialueContainer from '../containers/MuutospyyntoWizardToimialueContainer'
import MuutospyyntoWizardOpiskelijavuodet from './MuutospyyntoWizardOpiskelijavuodet'
import MuutospyyntoWizardMuutContainer from '../containers/MuutospyyntoWizardMuutContainer'
import { COLORS } from "../../../../../../modules/styles"
import { BottomWrapper, Kohde } from "./MuutospyyntoWizardComponents"
import { WizButton } from "./MuutospyyntoWizard"

class MuutospyyntoWizardMuutokset extends Component {
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
          {/*<MuutospyyntoWizardTutkinnot*/}
            {/*lupa={lupa}*/}
            {/*fetchKoulutusalat={fetchKoulutusalat}*/}
            {/*fetchKoulutuksetAll={fetchKoulutuksetAll}*/}
            {/*fetchKoulutuksetMuut={fetchKoulutuksetMuut}*/}
            {/*fetchKoulutus={fetchKoulutus}*/}
          {/*/>*/}

          {/*<Kohde>*/}
            {/*<MuutospyyntoWizardOpetuskieletContainer*/}
              {/*lupa={lupa}*/}
            {/*/>*/}

            {/*<MuutospyyntoWizardTutkintokieletContainer*/}
              {/*lupa={lupa}*/}
            {/*/>*/}
          {/*</Kohde>*/}

          {/*<Kohde>*/}
            {/*<MuutospyyntoWizardToimialueContainer*/}
              {/*lupa={lupa}*/}
            {/*/>*/}
          {/*</Kohde>*/}

          {/*<Kohde>*/}
            {/*<MuutospyyntoWizardOpiskelijavuodet*/}
              {/*lupa={lupa}*/}
            {/*/>*/}
          {/*</Kohde>*/}

          <Kohde>
            <MuutospyyntoWizardMuutContainer
              lupa={lupa}
            />
          </Kohde>

          <BottomWrapper>
            <WizButton type="submit">Seuraava</WizButton>
            <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
          </BottomWrapper>
        </form>
      </div>
    )

  }
}

export default MuutospyyntoWizardMuutokset
