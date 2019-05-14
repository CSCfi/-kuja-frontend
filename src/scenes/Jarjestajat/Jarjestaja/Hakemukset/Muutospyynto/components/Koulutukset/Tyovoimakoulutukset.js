import React, { useContext, useEffect, useState } from "react";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import { TUTKINNOT_SECTIONS } from "../../../../modules/constants";
import { fetchKoulutuksetMuut } from "services/koulutukset/actions";
import RadioButtonWithLabel from "01-molecules/RadioButtonWithLabel/RadioButtonWithLabel";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import ExpandableRow from "01-molecules/ExpandableRow/ExpandableRow";
import { MUUT_KEYS } from "../../modules/constants";
import PropTypes from "prop-types";
import _ from "lodash";

const Tyovoimakoulutukset = props => {
  const koodisto = "oivatyovoimakoulutus";
  const [state, setState] = useState({});
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );

  useEffect(() => {
    if (_.indexOf(koulutukset.muut.fetched, koodisto) !== -1) {
      setState(
        getDataForKoulutusList(
          koulutukset.muut.muudata[koodisto],
          props.changes
        )
      );
    }
  }, [koulutukset.muut.muudata, props.changes]);

  useEffect(() => {
    fetchKoulutuksetMuut(MUUT_KEYS.OIVA_TYOVOIMAKOULUTUS)(koulutuksetDispatch);
  }, []);

  const handleChanges = item => {
    props.onChanges(item, koodisto, true);
  };

  return (
    <Wrapper>
      <ExpandableRow
        title={TUTKINNOT_SECTIONS.TYOVOIMAT}
        changes={props.changes}
      >
        <div className="py-4">
          {_.map(state.items, (item, i) => {
            return (
              <div key={`item-${i}`} className="px-6 py-2">
                <RadioButtonWithLabel
                  name={koodisto}
                  isChecked={item.shouldBeSelected}
                  onChanges={handleChanges}
                  payload={item}
                >
                  <span className="ml-4">{item.code}</span>
                  <span className="ml-4">{item.title}</span>
                </RadioButtonWithLabel>
              </div>
            );
          })}
        </div>
      </ExpandableRow>
    </Wrapper>
  );
};

Tyovoimakoulutukset.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func
};

export default Tyovoimakoulutukset;
