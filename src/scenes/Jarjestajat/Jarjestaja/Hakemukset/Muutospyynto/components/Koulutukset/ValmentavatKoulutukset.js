import React, { useContext, useEffect, useState } from "react";
import { fetchKoulutus } from "services/koulutukset/actions";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import ExpandableRow from "01-molecules/ExpandableRow/ExpandableRow";
import SelectableItem from "02-organisms/SelectableItem";
import { TUTKINNOT_SECTIONS } from "../../../../modules/constants";
import PropTypes from "prop-types";
import _ from "lodash";

const ValmentavatKoulutukset = props => {
  const koodisto = "valmentavat";
  const [state, setState] = useState({});
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );

  useEffect(() => {
    if (koulutukset.poikkeukset.fetched.length === 2) {
      setState(
        getDataForKoulutusList(koulutukset.poikkeukset.data, props.changes)
      );
    }
  }, [koulutukset.poikkeukset, props.changes]);

  useEffect(() => {
    fetchKoulutus("999901")(koulutuksetDispatch);
    fetchKoulutus("999903")(koulutuksetDispatch);
  }, []);

  const handleChanges = item => {
    props.onChanges(item, koodisto);
  };

  return (
    <Wrapper>
      <ExpandableRow
        title={TUTKINNOT_SECTIONS.POIKKEUKSET}
        changes={props.changes}
      >
        <div className="py-4">
          {_.map(state.items, (item, i) => {
            return (
              <div key={`item-${i}`} className="mx-6 px-1 py-2">
                <SelectableItem item={item} onChanges={handleChanges} />
              </div>
            );
          })}
        </div>
      </ExpandableRow>
    </Wrapper>
  );
};

ValmentavatKoulutukset.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func
};

export default ValmentavatKoulutukset;
