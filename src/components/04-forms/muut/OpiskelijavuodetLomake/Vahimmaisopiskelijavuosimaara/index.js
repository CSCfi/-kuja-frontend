import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../../../../02-organisms/CategorizedListRoot";
import {
  getOpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake
} from "../../../../../services/lomakkeet/perustelut/muut";

const defaultProps = {
  changeObjects: []
};

const OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake = ({
                                           changeObjects = defaultProps.changeObjects,
                                           onChangesUpdate
                                         }) => {
  const [lomake, setLomake] = useState(getOpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake());
  const [changes, setChanges] = useState(null);
  const sectionId = "perustelut_opiskelijavuodet";
  useEffect(() => {
    setChanges(changeObjects);
  }, [changes, changeObjects]);

  return (
    <React.Fragment>
    {changes ? (
        <CategorizedListRoot
          anchor={sectionId}
          categories={lomake}
          changes={changes}
          onUpdate={onChangesUpdate}
          showCategoryTitles={true}
        />
      ) : null}
    </React.Fragment>
  );
};

OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake.propTypes = {
  changeObjects: PropTypes.array
};

export default OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake;
