import React from "react";
import PropTypes from "prop-types";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";

import "./perustelut-toiminta-alue.module.css";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { rules } from "../../../../../../../services/lomakkeet/perustelut/toiminta-alue/rules";

const defaultProps = {
  changeObjects: {},
  isReadOnly: false,
  kohde: {},
  lupakohde: {},
  stateObjects: {}
};

const PerustelutToimintaalue = React.memo(
  ({
    changeObjects = defaultProps.changeObjects,
    isReadOnly = defaultProps.isReadOnly,
    lupakohde = {},
    onChangesUpdate,
    sectionId,
    stateObjects = defaultProps.stateObjects
  }) => {
    return (
      <React.Fragment>
        {lupakohde && (
          <ExpandableRowRoot
            anchor={sectionId}
            categories={[]}
            changes={changeObjects.perustelut}
            disableReverting={true}
            hideAmountOfChanges={false}
            isExpanded={true}
            onUpdate={onChangesUpdate}
            sectionId={sectionId}
            title="Muutokset">
            <Lomake
              action="reasoning"
              anchor={sectionId}
              changeObjects={changeObjects.perustelut}
              data={{
                changeObjectsPage1: changeObjects.toimintaalue,
                lupakohde
              }}
              onChangesUpdate={onChangesUpdate}
              path={["toiminta-alue"]}
              rules={rules}
              showCategoryTitles={true}></Lomake>
          </ExpandableRowRoot>
        )}
      </React.Fragment>
    );
  }
);

PerustelutToimintaalue.propTypes = {
  changeObjects: PropTypes.object,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  isReadOnly: PropTypes.bool,
  kohde: PropTypes.object,
  lupakohde: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  stateObjects: PropTypes.object
};

export default PerustelutToimintaalue;
