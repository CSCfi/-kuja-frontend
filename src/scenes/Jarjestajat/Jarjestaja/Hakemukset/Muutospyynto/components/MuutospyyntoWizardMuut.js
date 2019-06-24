import React from "react";
import Section from '../../../../../../components/03-templates/Section'
import { ContentContainer } from "../../../../../../modules/elements";
import {
  Kohdenumero,
  Otsikko,
  Row,
  Checkbox,
  CheckboxRowContainer,
  RadioCheckbox,
  Div
} from "./MuutospyyntoWizardComponents";
import Loading from "../../../../../../modules/Loading";
import { parseLocalizedField } from "../../../../../../modules/helpers";
import { handleCheckboxChange } from "../../../../../../services/koulutukset/koulutusUtil";
import {
  FIELD_ARRAY_NAMES,
  FORM_NAME_UUSI_HAKEMUS,
  MUUTOS_TYPES
} from "../modules/uusiHakemusFormConstants";
import _ from "lodash";
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";

const MuutospyyntoWizardMuut = props => {
  const { lupa, muut, muutmuutoksetValue } = props;
  const { kohteet } = lupa;
  const kohde = kohteet[5];
  const { headingNumber, heading } = kohde;

  if (muut.fetched) {
    // Muut, vaativat, vankilat, kokeilut
    const { muutCombined } = kohde;
    const { data } = muut;
    let muutList = data;
    let vaativat1 = [];
    let vaativat2 = [];
    let vankilat = [];
    let kokeilut = [];
    let yhteistyo = [];
    let yhteistyosopimukset = [];
    let laajennettu = [];
    let sisaoppilaitos = [];
    let urheilijat = [];
    let muumaarays = [];
    // let luokattomat = []

    _.forEach(muutList, maarays => {
      const { metadata } = maarays;
      const kasite = parseLocalizedField(metadata, "FI", "kasite");
      const kuvaus = parseLocalizedField(metadata, "FI", "kuvaus");

      if (kuvaus) {
        switch (kasite) {
          case "laajennettu": {
            laajennettu.push(maarays);
            break;
          }
          case "sisaoppilaitos": {
            sisaoppilaitos.push(maarays);
            break;
          }
          case "urheilu": {
            urheilijat.push(maarays);
            break;
          }
          case "kokeilu": {
            kokeilut.push(maarays);
            break;
          }
          case "yhteistyo": {
            yhteistyo.push(maarays);
            break;
          }
          case "yhteistyosopimukset": {
            yhteistyosopimukset.push(maarays);
            break;
          }
          case "vaativa_1": {
            vaativat1.push(maarays);
            break;
          }
          case "vaativa_2": {
            vaativat2.push(maarays);
            break;
          }
          case "vankila": {
            vankilat.push(maarays);
            break;
          }
          case "muumaarays": {
            muumaarays.push(maarays);
            break;
          }
          default: {
            //   luokattomat.push(maarays)
            //   break
          }
        }
      }
    });

    const getHuomioitavaKoodi = data => {
      let { metadata } = data;
      return parseLocalizedField(metadata, "FI", "huomioitavaKoodi");
    };

    const renderMuutMuutokset = props => {
      const { muut, editValues, fields, otsikko } = props;
      let { muutList } = props;
      let { metadata } = muutList;
      muutList = muutList.sort(
        (a, b) => getHuomioitavaKoodi(a) - getHuomioitavaKoodi(b)
      );

      let title = undefined;
      let showGuide1 = false;
      let showGuide2 = 0;

      if (muutList.length > 0) {
        title = parseLocalizedField(muutList[0].metadata);

        if (otsikko !== "") {
          title = otsikko;
        }

        const kasite = parseLocalizedField(
          muutList[0].metadata,
          "FI",
          "kasite"
        );

        if (kasite === "vaativa_1") {
          showGuide1 = true;
        }
        if (kasite === "vaativa_2") {
          showGuide2 = 1;
        }
      }

      return (
        <div>
          <Row>
            <h4>{title}</h4>
            {showGuide1 && (
              <p>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_MUUT.YKSIVALINTA.FI}:</p>
            )}

            {muutList.map((muu, i) => {
              const { koodiArvo, koodisto, metadata, voimassaLoppuPvm } = muu;
              const { koodistoUri } = koodisto;
              const nimi = parseLocalizedField(metadata);
              let kuvaus = parseLocalizedField(metadata, "FI", "kuvaus") || "";
              // let kuvaus = koodiArvo + " - " + parseLocalizedField(metadata, 'FI', 'kuvaus') || ''

              const identifier = `input-${koodistoUri}-${koodiArvo}`;
              const kasite = parseLocalizedField(
                muutList[0].metadata,
                "FI",
                "kasite"
              );

              let isInLupa = false;
              let isAdded = false;
              let isRemoved = false;
              let isChecked = false;
              let customClassName = "";

              muut.forEach(m => {
                if (m.koodiarvo === koodiArvo) {
                  isInLupa = true;
                }
              });

              if (editValues) {
                editValues.forEach(val => {
                  if (val.koodiarvo === koodiArvo && val.nimi === nimi) {
                    isAdded = val.type === MUUTOS_TYPES.ADDITION || null;
                    isRemoved = val.type === MUUTOS_TYPES.REMOVAL || null;
                  }
                });
              }

              customClassName = isInLupa ? "is-in-lupa" : null;
              customClassName = isAdded ? "is-added" : null;
              customClassName = isRemoved ? "is-removed" : null;
              customClassName =
                voimassaLoppuPvm !== undefined ? "is-out-of-date" : null;

              if ((isInLupa && !isRemoved) || isAdded) {
                isChecked = true;
              }

              if (kuvaus && kuvaus !== "") {
                return (
                  <div key={identifier}>
                    {/* Näytä vain kerran ohjeteksti */}
                    {showGuide2 === 1 && showGuide2++ && (
                      <p>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_MUUT.LISAALINTA.FI}:</p>
                    )}
                    <CheckboxRowContainer
                      key={identifier}
                      className={customClassName}
                    >
                      {kasite === "vaativa_1" ? (
                        <RadioCheckbox>
                          <input
                            type="checkbox"
                            id={identifier}
                            checked={isChecked}
                            disabled={voimassaLoppuPvm !== undefined}
                            onChange={e => {
                              handleCheckboxChange(
                                e,
                                editValues,
                                fields,
                                isInLupa,
                                muu
                              );
                            }}
                          />
                          <label htmlFor={identifier} />
                        </RadioCheckbox>
                      ) : (
                        <Checkbox>
                          <input
                            type="checkbox"
                            id={identifier}
                            checked={isChecked}
                            disabled={voimassaLoppuPvm !== undefined}
                            onChange={e => {
                              handleCheckboxChange(
                                e,
                                editValues,
                                fields,
                                isInLupa,
                                muu
                              );
                            }}
                          />
                          <label htmlFor={identifier} />
                        </Checkbox>
                      )}
                      <Div margin="0 10px" flex="5">
                        {kuvaus}
                      </Div>
                    </CheckboxRowContainer>
                  </div>
                );
              }
            })}
          </Row>
        </div>
      );
    };

    return (
      <Section code={headingNumber} title={heading}>

      </Section>
    );
  } else if (muut.hasErrored) {
    return <h2>Muita määräyksiä ladattaessa tapahtui virhe</h2>;
  } else if (muut.isFetching) {
    return <Loading />;
  } else {
    return null;
  }
};

export default MuutospyyntoWizardMuut;
