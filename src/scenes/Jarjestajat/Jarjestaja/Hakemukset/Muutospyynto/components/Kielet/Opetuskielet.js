import React, { useContext, useEffect, useState } from "react";
import ExpandableRow from "components/ExpandableRow";
import { getDataForOpetuskieletList } from "services/kielet/opetuskieletUtil";
import SelectableItem from "components/SelectableItem";
import { MUUTOS_WIZARD_TEKSTIT } from "../../modules/constants";
import { KieletContext } from "context/kieletContext";
import { fetchOppilaitoksenOpetuskielet } from "services/kielet/actions";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import PropTypes from "prop-types";
import _ from "lodash";

const Opetuskielet = props => {
  const sectionId = "opetuskielet";
  const [state, setState] = useState({});
  const { state: kielet, dispatch } = useContext(KieletContext);

  useEffect(() => {
    setState(getDataForOpetuskieletList(kielet.data.opetuskielet, props.kohde, props.changes));
  }, [kielet, props.changes]);

  useEffect(() => {
    fetchOppilaitoksenOpetuskielet()(dispatch);
  }, []);

  const handleChanges = item => {
    props.onChanges(item, props.listId, sectionId);
  };

  return (
    <Wrapper>
      <ExpandableRow
        shouldBeExpanded={true}
        title={MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPETUSKIELET.HEADING.FI}
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

Opetuskielet.propTypes = {
  changes: PropTypes.array,
  listId: PropTypes.string,
  onChanges: PropTypes.func,
  kohde: PropTypes.object
};

export default Opetuskielet;
