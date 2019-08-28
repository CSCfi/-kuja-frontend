import React, { useEffect, useState } from "react";
import Section from "../../../../../../components/03-templates/Section";
import PerustelutMuut from "./Perustelut/PerustelutMuut";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import * as R from "ramda";

const MuutospyyntoWizardPerustelut = props => {
  const [kohteet, setKohteet] = useState(null);

  useEffect(() => {
    console.info(props.muutoshakemus);
  }, [props.muutoshakemus]);

  useEffect(() => {
    console.info(props.intl.locale, props.kohteet, props.lupa.kohteet);
    const kohteet = R.map(kohde => {
      console.info(kohde.tunniste);
      return {
        title: R.path(["meta", "otsikko", [props.intl.locale]], kohde),
        code: R.find(R.propEq("tunniste", kohde.tunniste))(props.lupa.kohteet)
      };
    }, props.kohteet);
    console.info(kohteet);
    setKohteet(kohteet);
  }, [props.intl.locale, props.kohteet, props.lupa.kohteet]);

  return (
    <React.Fragment>
      {props.muutoshakemus && kohteet && (
        <div>
          <Section code={1} title={kohteet[0].title} />

          <Section code={2} title={kohteet[1].title} />

          <Section code={3} title={kohteet[2].title} />

          <Section code={4} title={kohteet[3].title} />
          {R.keys(props.muutoshakemus.backendChanges.muut).length && (
            <PerustelutMuut
              backendChanges={props.muutoshakemus.backendChanges.muut}
              kohde={kohteet.muut}
              headingNumber={props.lupa.kohteet[5].headingNumber}
              maaraykset={props.lupa.data.maaraykset}
              muut={props.muut}
              onUpdate={props.onUpdate}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

MuutospyyntoWizardPerustelut.propTypes = {
  kohteet: PropTypes.array,
  muut: PropTypes.object,
  onUpdate: PropTypes.func,
  lupa: PropTypes.object,
  muutoshakemus: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardPerustelut);
