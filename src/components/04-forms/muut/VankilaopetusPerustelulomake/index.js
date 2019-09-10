import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../../../02-organisms/CategorizedListRoot";
import { getVankilakokoulutusPerustelulomake } from "../../../../services/lomakkeet/perustelut/muut";

import * as R from "ramda";

const defaultProps = {
  changes: []
};

const VankilakokoulutusPerustelulomake = ({
  changes = defaultProps.changes
}) => {
  const [lomake, setLomake] = useState(getVankilakokoulutusPerustelulomake());

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

VankilakokoulutusPerustelulomake.propTypes = {
  changes: PropTypes.array
};

export default VankilakokoulutusPerustelulomake;
