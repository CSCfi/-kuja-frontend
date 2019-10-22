import React from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../../../../02-organisms/CategorizedListRoot";
import { getOpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake } from "../../../../../services/lomakkeet/perustelut/muut";

const defaultProps = {
  changeObjects: [],
  isReadOnly: false
};

const OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake = ({
  changeObjects = defaultProps.changeObjects,
  onChangesUpdate,
  sectionId,
  isReadOnly = defaultProps.isReadOnly
}) => {
  const lomake = getOpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake(isReadOnly);

  return (
    <div className="p-8">
      {changeObjects ? (
        <CategorizedListRoot
          anchor={sectionId}
          categories={lomake}
          changes={changeObjects}
          onUpdate={onChangesUpdate}
          showCategoryTitles={true}
        />
      ) : null}
    </div>
  );
};

OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake.propTypes = {
  changeObjects: PropTypes.array,
  isReadOnly: PropTypes.bool
};

export default OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake;
