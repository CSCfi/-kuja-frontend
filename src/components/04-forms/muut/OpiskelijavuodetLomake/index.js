import React, { useState } from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../../../02-organisms/CategorizedListRoot";
import {
  getOpiskelijavuodetLomake
} from "../../../../services/lomakkeet/perustelut/muut";

const defaultProps = {
  changes: []
};

const OpiskelijavuodetPerustelulomake = ({ changes = defaultProps.changes }) => {
  const [lomake] = useState(getOpiskelijavuodetLomake());

  return (
    <CategorizedListRoot
      anchor="lomake"
      categories={lomake}
      changes={changes}
      onUpdate={() => {}}
      showCategoryTitles={true}
    />
  );
};

OpiskelijavuodetPerustelulomake.propTypes = {
  changes: PropTypes.array
};

export default OpiskelijavuodetPerustelulomake;
