import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../../../../02-organisms/CategorizedListRoot";
import {getOpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake} from "../../../../../services/lomakkeet/perustelut/muut";

const defaultProps = {
  changeObjects: []
};

const OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake = ({
                                                                        changeObjects = defaultProps.changeObjects,
                                                                        onChangesUpdate, sectionId
                                                                      }) => {
  const [lomake, setLomake] = useState(getOpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake());
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

OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake.propTypes = {
  changeObjects: PropTypes.array
};

export default OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake;
