import React, { useMemo, useRef } from "react";
import Opetuskielet from "./Kielet/Opetuskielet";
import PropTypes from "prop-types";
import { KIELET_SECTIONS } from "../../../modules/constants";
import Tutkintokielet from "./Kielet/Tutkintokielet";
import * as R from "ramda";
import _ from "lodash";

const MuutospyyntoWizardKielet = React.memo(props => {
  const prevTutkinnotItemsRef = useRef();

  const { lupa } = props;

  /**
   * Array of anhors of checkboxes which have been checked. The idea behind
   * this is to remove corresponding change objects of Tutkintokielet section.
   *
   * E.g."321204 Musiikkialan perustutkinto" has been checked and user
   * disables it. We need to remove all changes on Tutkintokielet section
   * related to the disabed degree.
   */
  const unselectedAnchors = useMemo(() => {
    const clonedPrevChanges = _.cloneDeep(prevTutkinnotItemsRef.current) || {};

    /**
     * There are two use cases:
     *
     * 1) Degree is unchecked. User activates it and deactivates it later.
     * 2) Degree is checked by default and user deactivates.
     */

    // Use case 1 (Array 1)
    const wereSelected = R.map(
      R.prop("anchor"),
      R.flatten(
        R.values(
          R.mapObjIndexed((value, key) => {
            return R.filter(changeObj => {
              const isInCurrentChanges = !!R.find(
                R.propEq("anchor", changeObj.anchor),
                props.changeObjects.tutkinnot[key] || []
              );
              return changeObj.properties.isChecked && !isInCurrentChanges;
            }, value);
          }, clonedPrevChanges)
        )
      )
    );

    // Use case 2 (Array 2)
    const wereSelectedByDefault = R.map(
      R.prop("anchor"),
      R.filter(
        R.compose(R.equals(false), R.path(["properties", "isChecked"])),
        R.flatten(R.values(props.changeObjects.tutkinnot))
      )
    );

    prevTutkinnotItemsRef.current = props.changeObjects.tutkinnot;

    // Here we combine the arrays 1 and 2
    return R.concat(wereSelected, wereSelectedByDefault);
  }, [props.changeObjects.tutkinnot]);

  return (
    <React.Fragment>
      <Opetuskielet
        changeObjects={props.changeObjects.kielet.opetuskielet}
        opetuskielet={props.kielet.opetuskielet}
        kohde={props.lupaKohteet[2]}
        lupa={lupa}
        maaraystyyppi={props.maaraystyyppi}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />

      <h4 className="py-4">{KIELET_SECTIONS.TUTKINTOKIELET}</h4>
      {/* Language options for degrees can't be shown without degrees.  */}
      {!R.isEmpty(props.tutkintolomakkeet) && (
        <Tutkintokielet
          changeObjects={{
            tutkintokielet: props.changeObjects.kielet.tutkintokielet,
            tutkinnot: props.changeObjects.tutkinnot
          }}
          kielet={props.kielet.kielet}
          kohde={props.lupaKohteet[1]}
          lupa={lupa}
          onChangesRemove={props.onChangesRemove}
          onChangesUpdate={props.onChangesUpdate}
          tutkintolomakkeet={props.tutkintolomakkeet}
          unselectedAnchors={unselectedAnchors}
        />
      )}
    </React.Fragment>
  );
});

MuutospyyntoWizardKielet.defaultProps = {
  changeObjects: { tutkinnot: [] }
};

MuutospyyntoWizardKielet.propTypes = {
  changeObjects: PropTypes.object,
  kielet: PropTypes.object,
  koulutukset: PropTypes.object,
  lupa: PropTypes.object,
  lupaKohteet: PropTypes.object,
  tutkintolomakkeet: PropTypes.object
};

export default MuutospyyntoWizardKielet;
