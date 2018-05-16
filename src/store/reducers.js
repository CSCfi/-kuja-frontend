import { combineReducers } from 'redux'

import luvatReducer from '../routes/Jarjestajat/modules/luvat'
import lupaReducer from '../routes/Jarjestajat/Jarjestaja/modules/lupa'
import historyReducer from '../routes/Jarjestajat/Jarjestaja/modules/history'
import userReducer from '../routes/Login/modules/user'
import muutospyynnotReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/modules/muutospyynnot'
import muutospyyntoReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/muutospyynto'
import muutosperustelutReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/muutosperustelut'
import koulutusalatReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/koulutusalat'
import koulutuksetReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/koulutukset'
import paatoskierroksetReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/paatoskierrokset'
import oppilaitoksenopetuskieletReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/oppilaitoksenopetuskielet'
import kieletReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/kielet'
import kunnatReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/kunnat'
import maakunnatReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/maakunnat'
import maakuntakunnatReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/maakuntakunnat'
import muutReducer from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/muut'
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  luvat: luvatReducer,
  lupa: lupaReducer,
  lupaHistory: historyReducer,
  user: userReducer,
  muutospyynnot: muutospyynnotReducer,
  muutospyynto: muutospyyntoReducer,
  muutosperustelut: muutosperustelutReducer,
  koulutusalat: koulutusalatReducer,
  koulutukset: koulutuksetReducer,
  paatoskierrokset: paatoskierroksetReducer,
  oppilaitoksenopetuskielet: oppilaitoksenopetuskieletReducer,
  kielet: kieletReducer,
  kunnat: kunnatReducer,
  maakunnat: maakunnatReducer,
  maakuntakunnat: maakuntakunnatReducer,
  muut: muutReducer,
  form: reduxFormReducer
})

export default rootReducer
