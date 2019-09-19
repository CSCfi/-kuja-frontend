import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";

import TaloudellisetYleisettiedot from "./Taloudelliset/TaloudellisetYleisettiedot";
import * as R from "ramda";
import FormSection from "../../../../../../components/03-templates/FormSection";

const Taloudelliset = props => {
  var { fields, taloudellisetValue } = this.props;
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;
  const {
    edellytykset,
    vaikutukset,
    sopeuttaminen,
    investoinnit,
    kustannukset,
    rahoitus,
    omavaraisuusaste,
    maksuvalmius,
    velkaantuneisuus,
    kannattavuus,
    kumulatiivinen
  } = taloudellisetValue;

  console.log(fields.get(0));

  if (!fields.get(0)) {
    fields.push({
      edellytykset: edellytykset,
      vaikutukset: vaikutukset,
      sopeuttaminen: sopeuttaminen,
      investoinnit: investoinnit,
      kustannukset: kustannukset,
      rahoitus: rahoitus,
      omavaraisuusaste: omavaraisuusaste,
      maksuvalmius: maksuvalmius,
      velkaantuneisuus: velkaantuneisuus,
      kannattavuus: kannattavuus,
      kumulatiivinen: kumulatiivinen
    });
  }

  return (
    <React.Fragment>
      {/* {!!R.prop(["muut"], changeObjects) ? ( */}
      <FormSection
        code={1}
        id="taloudelliset_yleisettiedot"
        stateObject={props.stateObject}
        onStateUpdate={onStateUpdate}
        // muutoshakemus={muutoshakemus}
        // render={_props => (
        //   <React.Fragment>
        //     {!!R.path(["muut"], changeObjects) ? (
        //       <TaloudellisetYleisettiedot
        //         changeObjects={{
        //           muut: R.path(["muut"], changeObjects) || [],
        //           taloudelliset:
        //             R.path(["taloudelliset", "yleisettiedot"], changeObjects) ||
        //             []
        //         }}
        //         kohde={R.find(R.propEq("tunniste", "taloudelliset"))(kohteet)}
        //         stateObject={R.path(["taloudelliset", "yleisettiedot"])(
        //           muutoshakemus
        //         )}
        //         {..._props}
        //       />
        //     ) : null}
        //   </React.Fragment>
        // )}
        // runOnStateUpdate={onStateUpdate}
        // runOnChanges={onChangesUpdate}
        // title={kohdetiedot[4].title}
      />
      {/* ) : null}
  ) */}
    </React.Fragment>
  );
};
// return (
//   <React.Fragment>
//     <H4>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.YLEISET.FI}</H4>

//     <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.EDELLYTYKSET.FI}</label>
//     <Textarea
//       rows="5"
//       defaultValue={edellytykset !== null ? edellytykset : undefined}
//       onBlur={e => {
//         let obj = fields.get(0);
//         obj.edellytykset = e.target.value;
//         fields.remove(0);
//         fields.insert(0, obj);
//       }}
//     ></Textarea>

//     <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.VAIKUTUKSET.FI}</label>
//     <Textarea
//       rows="5"
//       defaultValue={vaikutukset !== null ? vaikutukset : undefined}
//       onBlur={e => {
//         let obj = fields.get(0);
//         obj.vaikutukset = e.target.value;
//         fields.remove(0);
//         fields.insert(0, obj);
//       }}
//     ></Textarea>

//     <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.SOPEUTTAMINEN.FI}</label>
//     <Textarea
//       rows="5"
//       defaultValue={sopeuttaminen !== null ? sopeuttaminen : undefined}
//       onBlur={e => {
//         let obj = fields.get(0);
//         obj.sopeuttaminen = e.target.value;
//         fields.remove(0);
//         fields.insert(0, obj);
//       }}
//     ></Textarea>

//     <Separator />

//     <H4>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.INVESTOINNIT_LEGEND.FI}</H4>

//     <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.INVESTOINNIT.FI}</label>
//     <Textarea
//       rows="5"
//       defaultValue={investoinnit !== null ? investoinnit : undefined}
//       onBlur={e => {
//         let obj = fields.get(0);
//         obj.investoinnit = e.target.value;
//         fields.remove(0);
//         fields.insert(0, obj);
//       }}
//     ></Textarea>

//     <FormGroup>
//       <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.KUSTANNUKSET.FI}</Label>
//       <FormField>
//         <input
//           type="number"
//           defaultValue={kustannukset !== null ? kustannukset : undefined}
//           onBlur={e => {
//             let obj = fields.get(0);
//             obj.kustannukset = e.target.value;
//             fields.remove(0);
//             fields.insert(0, obj);
//           }}
//         />
//       </FormField>
//     </FormGroup>

//     <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.RAHOITUS.FI}</label>
//     <Textarea
//       rows="5"
//       defaultValue={rahoitus !== null ? rahoitus : undefined}
//       onBlur={e => {
//         let obj = fields.get(0);
//         obj.rahoitus = e.target.value;
//         fields.remove(0);
//         fields.insert(0, obj);
//       }}
//     ></Textarea>

//     <Separator />

//     <H4>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.TILINPAATOSTIEDOT.FI}</H4>

//     <FormGroup>
//       <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.OMAVARAISUUSASTE.FI}</Label>
//       <FormField>
//         <input
//           type="number"
//           defaultValue={
//             omavaraisuusaste !== null ? omavaraisuusaste : undefined
//           }
//           onBlur={e => {
//             let obj = fields.get(0);
//             obj.omavaraisuusaste = e.target.value;
//             fields.remove(0);
//             fields.insert(0, obj);
//           }}
//         />
//       </FormField>
//     </FormGroup>

//     <FormGroup>
//       <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.MAKSUVALMIUS.FI}</Label>
//       <FormField>
//         <input
//           type="number"
//           defaultValue={maksuvalmius !== null ? maksuvalmius : undefined}
//           onBlur={e => {
//             let obj = fields.get(0);
//             obj.maksuvalmius = e.target.value;
//             fields.remove(0);
//             fields.insert(0, obj);
//           }}
//         />
//       </FormField>
//     </FormGroup>

//     <FormGroup>
//       <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.VELKAANTUNEISUUS.FI}</Label>
//       <FormField>
//         <input
//           type="number"
//           defaultValue={
//             velkaantuneisuus !== null ? velkaantuneisuus : undefined
//           }
//           onBlur={e => {
//             let obj = fields.get(0);
//             obj.velkaantuneisuus = e.target.value;
//             fields.remove(0);
//             fields.insert(0, obj);
//           }}
//         />
//       </FormField>
//     </FormGroup>

//     <FormGroup>
//       <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.KANNATTAVUUS.FI}</Label>
//       <FormField>
//         <input
//           type="number"
//           defaultValue={kannattavuus !== null ? kannattavuus : undefined}
//           onBlur={e => {
//             let obj = fields.get(0);
//             obj.kannattavuus = e.target.value;
//             fields.remove(0);
//             fields.insert(0, obj);
//           }}
//         />
//       </FormField>
//     </FormGroup>

//     <FormGroup>
//       <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.KUMULATIIVINEN.FI}</Label>
//       <FormField>
//         <input
//           type="number"
//           defaultValue={kumulatiivinen !== null ? kumulatiivinen : undefined}
//           onBlur={e => {
//             let obj = fields.get(0);
//             obj.kumulatiivinen = e.target.value;
//             fields.remove(0);
//             fields.insert(0, obj);
//           }}
//         />
//       </FormField>
//     </FormGroup>

//     <Separator />

//     <FormGroup>
//       <Attachments {...this.props} paikka="taloudelliset" />
//     </FormGroup>
//   </React.Fragment>
// );

export default injectIntl(Taloudelliset);
