import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// import luvatReducer from 'routes/Jarjestajat/modules/luvat'
// import lupaReducer from 'routes/Jarjestajat/Jarjestaja/modules/lupa'
// import historyReducer from 'routes/Jarjestajat/Jarjestaja/modules/history'
import userReducer from 'services/users/reducer'
// import muutospyynnotReducer from 'routes/Jarjestajat/Jarjestaja/Hakemukset/modules/muutospyynnot'
// import muutospyyntoReducer from 'routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/muutospyynto'
// import muutosperustelutReducer from 'modules/reducers/muutosperustelut'
// import vankilatReducer from 'modules/reducers/vankilat'
// import ELYkeskuksetReducer from 'modules/reducers/elykeskukset'
// import koulutusalatReducer from 'modules/reducers/koulutusalat'
// import koulutustyypitReducer from 'modules/reducers/koulutustyypit'
// import koulutuksetReducer from 'modules/reducers/koulutukset'
// import paatoskierroksetReducer from 'modules/reducers/paatoskierrokset'
// import oppilaitoksenopetuskieletReducer from 'routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/oppilaitoksenopetuskielet'
// import kieletReducer from 'routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/kielet'
// import kunnatReducer from 'modules/reducers/kunnat'
// import maakunnatReducer from 'modules/reducers/maakunnat'
// import maakuntakunnatReducer from 'modules/reducers/maakuntakunnat'
// import muutReducer from 'modules/reducers/muut'
// import maaraystyypitReducer from 'modules/reducers/maaraystyyppi'
// import kohdeReducer from 'modules/reducers/kohde'
// import { reducer as reduxFormReducer } from 'redux-form';

export default (history) => combineReducers({
  router: connectRouter(history),
  user: userReducer
  // luvat: luvatReducer
//   lupa: lupaReducer,
//   lupaHistory: historyReducer,
//   muutospyynnot: muutospyynnotReducer,
//   muutospyynto: muutospyyntoReducer,
//   muutosperustelut: muutosperustelutReducer,
//   vankilat: vankilatReducer,
//   ELYkeskukset: ELYkeskuksetReducer,
//   koulutusalat: koulutusalatReducer,
//   koulutustyypit: koulutustyypitReducer,
//   koulutukset: koulutuksetReducer,
//   paatoskierrokset: paatoskierroksetReducer,
//   oppilaitoksenopetuskielet: oppilaitoksenopetuskieletReducer,
//   kielet: kieletReducer,
//   kunnat: kunnatReducer,
//   maakunnat: maakunnatReducer,
//   maakuntakunnat: maakuntakunnatReducer,
//   muut: muutReducer,
//   maaraystyypit: maaraystyypitReducer,
//   kohteet: kohdeReducer,
//   form: reduxFormReducer
})