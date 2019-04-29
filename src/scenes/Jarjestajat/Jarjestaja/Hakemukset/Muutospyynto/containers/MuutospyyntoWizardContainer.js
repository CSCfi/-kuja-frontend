import React, { useEffect } from "react";
// import { connect } from "react-redux";

// import { fetchMuutosperustelut } from "services/perustelut/actions";
// import { fetchVankilat } from "services/vankilat/actions";
// import { fetchELYkeskukset } from "modules/reducers/elykeskukset";
// import { fetchLupa } from "../../../modules/lupa";
// import {
//   createMuutospyynto,
//   saveMuutospyynto,
//   fetchMuutospyynto,
//   updateMuutospyynto
// } from "../modules/muutospyynto";
// import { previewMuutospyynto } from "../modules/muutospyynto";
// import { fetchKoulutusalat } from "modules/reducers/koulutusalat";
// import { fetchKoulutustyypit } from "services/koulutustyypit/actions";
// import {
//   fetchKoulutuksetAll,
//   fetchKoulutuksetMuut,
//   fetchKoulutus
// } from "services/koulutukset/actions";
// import { fetchPaatoskierrokset } from "modules/reducers/paatoskierrokset";
// import { fetchMaaraystyypit } from "modules/reducers/maaraystyyppi";
// import { fetchKohteet } from "modules/reducers/kohde";
// import { withRouter } from "react-router-dom";

// import MuutospyyntoWizard from "../components/MuutospyyntoWizard";

export default function Wizard() {
  useEffect(() => {
    document.title = "Raipe testailee";
  });
  return <div>Heloo</div>;
}
//   componentDidMount() {
//     this.props.fetchVankilat();
//     this.props.fetchMuutosperustelut();
//     this.props.fetchVankilat();
//     this.props.fetchELYkeskukset();
//     const { ytunnus, uuid } = this.props.match.params;
//     this.props.fetchLupa(ytunnus, "?with=all");
//     this.props.fetchPaatoskierrokset();
//     this.props.fetchMaaraystyypit();
//     this.props.fetchKohteet();
//     this.props.fetchMuutospyynto(uuid); // from EDIT form
//   }

// }

// const mapStateToProps = state => {
//   return {
//     muutosperustelut: state.muutosperustelut,
//     vankilat: state.vankilat,
//     ELYkeskukset: state.ELYkeskukset,
//     lupa: state.lupa,
//     koulutukset: state.koulutukset,
//     paatoskierrokset: state.paatoskierrokset,
//     muutospyynto: state.muutospyynto,
//     maaraystyypit: state.maaraystyypit,
//     kohteet: state.kohteet
//   };
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     fetchMuutosperustelut: () => dispatch(fetchMuutosperustelut()),
//     fetchVankilat: () => dispatch(fetchVankilat()),
//     fetchELYkeskukset: () => dispatch(fetchELYkeskukset()),
//     fetchLupa: (ytunnus, query) => dispatch(fetchLupa(ytunnus, query)),
//     createMuutospyynto: uuid => dispatch(createMuutospyynto(uuid)),
//     saveMuutospyynto: muutospyynto => dispatch(saveMuutospyynto(muutospyynto)),
//     previewMuutospyynto: muutospyynto =>
//       dispatch(previewMuutospyynto(muutospyynto)),
//     updateMuutospyynto: muutospyynto =>
//       dispatch(updateMuutospyynto(muutospyynto)),
//     fetchMuutospyynto: uuid => dispatch(fetchMuutospyynto(uuid)),
//     fetchKoulutusalat: () => dispatch(fetchKoulutusalat()),
//     fetchKoulutustyypit: () => dispatch(fetchKoulutustyypit()),
//     fetchKoulutuksetAll: () => dispatch(fetchKoulutuksetAll()),
//     fetchKoulutuksetMuut: koodisto => dispatch(fetchKoulutuksetMuut(koodisto)),
//     fetchKoulutus: koodi => dispatch(fetchKoulutus(koodi)),
//     fetchPaatoskierrokset: () => dispatch(fetchPaatoskierrokset()),
//     fetchMaaraystyypit: () => dispatch(fetchMaaraystyypit()),
//     fetchKohteet: () => dispatch(fetchKohteet())
//   };
// };

// export default connect(
//   mapStateToProps,
//   null
// )(MuutospyyntoWizardContainer);
