import React, { useContext, useEffect, useState } from "react";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import ExpandableRow from "components/01-molecules/ExpandableRow";
import SelectableItem from "components/02-organisms/SelectableItem";
import { MUUT_KEYS } from "../../modules/constants";
import { TUTKINNOT_SECTIONS } from "../../../../modules/constants";
import { fetchKoulutuksetMuut } from "services/koulutukset/actions";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import PropTypes from "prop-types";
import _ from "lodash";

const AmmatilliseenTehtavaanValmistavatKoulutukset = props => {
  const [state, setState] = useState({});
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );

  useEffect(() => {
    if (
      _.indexOf(
        koulutukset.muut.fetched,
        "ammatilliseentehtavaanvalmistavakoulutus"
      ) !== -1
    ) {
      setState(
        getDataForKoulutusList(
          koulutukset.muut.muudata.ammatilliseentehtavaanvalmistavakoulutus,
          props.changes
        )
      );
    }
  }, [koulutukset.muut.muudata, props.changes]);

  useEffect(() => {
    fetchKoulutuksetMuut(MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS)(
      koulutuksetDispatch
    );
  }, []);

  const handleChanges = item => {
    props.onChanges(item, "ammatilliseentehtavaanvalmistavakoulutus");
  };

  return (
    <Wrapper>
      <ExpandableRow changes={props.changes}>
        <div data-slot="title">
          <span>{TUTKINNOT_SECTIONS.VALMISTAVAT}</span>
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

AmmatilliseenTehtavaanValmistavatKoulutukset.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func
};

export default AmmatilliseenTehtavaanValmistavatKoulutukset;
