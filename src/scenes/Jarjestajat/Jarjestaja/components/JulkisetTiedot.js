import React from 'react'
import { LUPA_EXCEPTION_PATH } from "../../../../modules/constants"
import CurrentLupa from './CurrentLupa'
import Typography from "@material-ui/core/Typography";
import { LUPA_TEKSTIT } from "../modules/constants"
import { LUPA_LISAKOULUTTAJAT } from "../../constants"

const JulkisetTiedot = (props) => {
  const { lupadata } = props
  const { jarjestaja } = lupadata
  const { diaarinumero, jarjestajaOid } = lupadata
  let { alkupvm } = lupadata
  const jarjestajaNimi = jarjestaja.nimi.fi || jarjestaja.nimi.sv || ''
  const lupaException = LUPA_LISAKOULUTTAJAT[jarjestaja.ytunnus]

  if (lupaException) {
    alkupvm = lupaException.pvm
  }

  return (
    <div className="bg-white p-16">
      <div>
        <div>
          <Typography>{LUPA_TEKSTIT.PAATOKSET.OTSIKKO.FI}</Typography>
          <Typography paragraph={true} variant="h6">{LUPA_TEKSTIT.PAATOKSET.VIIMEISIN.FI}</Typography>
        </div>

        <CurrentLupa
          diaarinumero={diaarinumero}
          jarjestaja={jarjestajaNimi}
          voimassaolo={alkupvm}
          lupaExceptionUrl={lupaException ? `${LUPA_EXCEPTION_PATH}${lupaException.pdflink}` : null}
        />

        <p>{LUPA_TEKSTIT.PAATOKSET.HISTORIATIEDOT.FI}</p>
        <br />

        <p jarjestajaOid={jarjestajaOid} />
      </div>

    </div>
  )
}

export default JulkisetTiedot
