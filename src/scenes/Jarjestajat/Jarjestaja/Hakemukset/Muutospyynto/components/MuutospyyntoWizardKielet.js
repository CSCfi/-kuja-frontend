import React, { useEffect, useRef, useState } from "react";
import Opetuskielet from "./Kielet/Opetuskielet";
import PropTypes from "prop-types";
import { KIELET_SECTIONS } from "../../../modules/constants";
import Tutkintokielet from "./Kielet/Tutkintokielet";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import _ from "lodash";
import wizardMessages from "../../../../../../i18n/definitions/wizard";

const MuutospyyntoWizardKielet = React.memo(props => {
  const prevTutkinnotItemsRef = useRef();

  const [unselectedAnchors, setUnselectedAnchors] = useState({});
  const { lupa } = props;

  useEffect(() => {
    const anchors = {};
    const clonedPrevChanges = _.cloneDeep(prevTutkinnotItemsRef.current);
    console.info("Muutokset: ", props.changeObjects.tutkinnot);
    if (props.changeObjects.tutkinnot) {
      R.forEach(stateItem => {
        const stateItemAnchors = R.map(R.prop("anchor"))(
          R.path(["tutkinnot", stateItem.areaCode], props.changeObjects)
        );

        anchors[stateItem.areaCode] = [];
        /**
         * Käydään Tutkinnot-osion tila läpi ja otetaan ylös niiden tutkintojen ankkurit, joista käyttäjä on poistanut valinnan.
         * Näin tehden vastaavat Tutkintokielet-aliosion muutokset osataan poistaa.
         * Esimerkki ankkurista: 02.1.321604
         */
        if (stateItemAnchors.length) {
          anchors[stateItem.areaCode] = R.map(
            R.prop("anchor"),
            R.filter(
              changeObj => changeObj.properties.isChecked === false,
              props.changeObjects.tutkinnot[stateItem.areaCode]
            )
          );
        }
        /**
         * Lisätään ankkurilistaan ne ankkurit, joita vastaavat lisäykset käyttäjä on Tutkinnot-osiosta juuri poistanut.
         */
        //   const changes =
        //     (
        //       R.find(R.propEq("areaCode", stateItem.areaCode))(
        //         clonedPrevChanges || []
        //       ) || {}
        //     ).changes || [];
        //   const additions = R.map(
        //     R.prop("anchor"),
        //     R.filter(
        //       R.compose(
        //         R.equals(true),
        //         R.path(["properties", "isChecked"])
        //       )
        //     )(changes)
        //   );
        //   anchors[stateItem.areaCode] = anchors[stateItem.areaCode].concat(
        //     R.without(stateItemAnchors, additions)
        //   );
        //   return stateItem;
      }, props.stateObjects.tutkinnot.items);
      prevTutkinnotItemsRef.current = props.stateObjects.tutkinnot.items;
      console.info(anchors);
      setUnselectedAnchors(anchors);
    }
  }, [props.changeObjects.tutkinnot, props.stateObjects.tutkinnot.items]);

  return (
    <React.Fragment>
      <Opetuskielet
        changeObjects={R.path(["kielet", "opetuskielet"], props.changeObjects)}
        opetuskielet={props.kielet.opetuskielet}
        kohde={props.lupa.kohteet[2]}
        lupa={lupa}
        maaraystyyppi={props.maaraystyyppi}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
        onStateUpdate={props.onStateUpdate}
        stateObject={props.stateObjects.kielet.opetuskielet}
      />

      <h4 className="py-4">{KIELET_SECTIONS.TUTKINTOKIELET}</h4>

      {R.path(["tutkinnot", "items"], props.stateObjects) ? (
        <Tutkintokielet
          changeObjects={{
            tutkintokielet: R.path(
              ["kielet", "tutkintokielet"],
              props.changeObjects
            ),
            tutkinnot: R.path(["tutkinnot"], props.changeObjects)
          }}
          kielet={props.kielet.kielet}
          kohde={props.lupa.kohteet[1]}
          locale={R.toUpper(props.intl.locale)}
          lupa={lupa}
          onChangesRemove={props.onChangesRemove}
          onChangesUpdate={props.onChangesUpdate}
          onStateUpdate={props.onStateUpdate}
          stateObjects={{
            tutkintokielet:
              R.path(["kielet", "tutkintokielet"], props.stateObjects) || {},
            tutkinnot: R.path(["tutkinnot"], props.stateObjects)
          }}
          unselectedAnchors={unselectedAnchors}
        />
      ) : null}
    </React.Fragment>
  );
});

MuutospyyntoWizardKielet.defaultProps = {
  changeObjects: { tutkinnot: [] },
  stateObjects: {}
};

MuutospyyntoWizardKielet.propTypes = {
  changeObjects: PropTypes.object,
  kielet: PropTypes.object,
  koulutukset: PropTypes.object,
  lupa: PropTypes.object,
  stateObjects: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardKielet);
