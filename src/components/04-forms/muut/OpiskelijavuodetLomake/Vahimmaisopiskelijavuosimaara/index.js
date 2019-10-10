import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import CategorizedListRoot from "../../../../02-organisms/CategorizedListRoot";
import { getOpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake } from "../../../../../services/lomakkeet/perustelut/muut";
import * as R from "ramda";

const defaultProps = {
  changeObjects: [],
  muutosperustelut: []
};

const OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake = ({
  changeObjects = defaultProps.changeObjects,
  intl,
  muutosperustelut = defaultProps.muutosperustelut,
  onChangesUpdate,
  sectionId
}) => {
  const lomake = getOpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake(
    muutosperustelut,
    R.toUpper(intl.locale)
  );

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

OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake.propTypes = {
  changeObjects: PropTypes.array,
  muutosperustelut: PropTypes.array
};

export default injectIntl(
  OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake
);
