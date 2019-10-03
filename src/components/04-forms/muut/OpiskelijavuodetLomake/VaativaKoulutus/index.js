import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../../../../02-organisms/CategorizedListRoot";
import {getOpiskelijavuodetVaativaKoulutusPerustelulomake} from "../../../../../services/lomakkeet/perustelut/muut";

const defaultProps = {
  changeObjects: []
};

const OpiskelijavuodetVaativaKoulutusPerustelulomake = ({
                                           changeObjects = defaultProps.changeObjects,
                                           onChangesUpdate, sectionId
                                         }) => {
  const [lomake, setLomake] = useState(getOpiskelijavuodetVaativaKoulutusPerustelulomake());
  const [changes, setChanges] = useState(null);
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

OpiskelijavuodetVaativaKoulutusPerustelulomake.propTypes = {
  changeObjects: PropTypes.array
};

export default OpiskelijavuodetVaativaKoulutusPerustelulomake;
