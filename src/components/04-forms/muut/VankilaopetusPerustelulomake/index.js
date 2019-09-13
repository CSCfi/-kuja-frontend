import React, { useState } from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../../../02-organisms/CategorizedListRoot";
import { getVankilaopetusPerustelulomake } from "../../../../services/lomakkeet/perustelut/muut";

const defaultProps = {
  changes: []
};

const VankilaopetusPerustelulomake = ({ changes = defaultProps.changes }) => {
  const [lomake] = useState(getVankilaopetusPerustelulomake());

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

VankilaopetusPerustelulomake.propTypes = {
  changes: PropTypes.array
};

export default VankilaopetusPerustelulomake;
