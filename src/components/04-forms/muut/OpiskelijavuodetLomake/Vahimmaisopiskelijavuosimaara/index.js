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
                                           onChangesUpdate, sectionId
                                         }) => {
  const lomake = getOpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake();

  return (
    <React.Fragment>
    {changeObjects ? (
        <CategorizedListRoot
          anchor={sectionId}
          categories={lomake}
          changes={changeObjects}
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
