import React, { useContext, useEffect, useState } from "react";
import { fetchKoulutus } from "services/koulutukset/actions";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import ExpandableRow from "components/01-molecules/ExpandableRow";
import SelectableItem from "components/02-organisms/SelectableItem";
import { TUTKINNOT_SECTIONS } from "../../../../modules/constants";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
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
  }, [koulutuksetDispatch]);

  const handleChanges = item => {
    props.onChanges(item, koodisto);
  };

  return (
    <Wrapper>
      <ExpandableRow>
        <div data-slot="title">
          <span>{TUTKINNOT_SECTIONS.POIKKEUKSET}</span>
        </div>
        <div data-slot="info">
          <NumberOfChanges changes={props.changes} />
        </div>
        <div data-slot="content">
          <div className="py-4">
            {_.map(state.items, (item, i) => {
              return (
                <div key={`item-${i}`} className="mx-6 px-1 py-2">
                  <SelectableItem item={item} onChanges={handleChanges} />
                </div>
              );
            })}
          </div>
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
