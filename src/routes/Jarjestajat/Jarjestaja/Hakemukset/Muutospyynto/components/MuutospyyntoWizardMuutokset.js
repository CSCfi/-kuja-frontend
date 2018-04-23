import React, { Component } from 'react'

import MuutospyyntoWizardTutkinnot from './MuutospyyntoWizardTutkinnot'
import MuutospyyntoWizardKielet from './MuutospyyntoWizardKielet'
import { COLORS } from "../../../../../../modules/styles"
import { BottomWrapper } from "./MuutospyyntoWizardComponents"
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
          <MuutospyyntoWizardTutkinnot
            previousPage={previousPage}
            onSubmit={onSubmit}
            onCancel={onCancel}
            lupa={lupa}
            fetchKoulutusalat={fetchKoulutusalat}
            fetchKoulutuksetAll={fetchKoulutuksetAll}
            fetchKoulutuksetMuut={fetchKoulutuksetMuut}
            fetchKoulutus={fetchKoulutus}
          />

          <MuutospyyntoWizardKielet
            lupa={lupa}
          />

          <BottomWrapper>
            <WizButton type="button" onClick={previousPage}>
              Edellinen
            </WizButton>
            <WizButton type="submit">Seuraava</WizButton>
            <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
          </BottomWrapper>
        </form>
      </div>
    )

  }
}

export default MuutospyyntoWizardMuutokset
