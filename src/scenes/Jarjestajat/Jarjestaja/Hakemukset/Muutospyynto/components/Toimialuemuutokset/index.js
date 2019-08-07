import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import * as R from "ramda";

const Toimialuemuutokset = React.memo(props => {
  const [kunnat, setKunnat] = useState([]);
  const [maakunnat, setMaakunnat] = useState([]);

  useEffect(() => {
    setMaakunnat(
      R.uniq(
        R.concat(
          R.filter(R.propEq("koodisto", "maakunta"), props.initialValues),
          R.filter(R.propEq("koodisto", "maakunta"), props.values)
        )
      )
    );
    setKunnat(R.filter(R.propEq("koodisto", "kunta"), props.values));
  }, [props.initialValues, props.values]);

  const getListOfSelectedValues = areaData => {
    return (
      <ul className="list-disc pl-8 pt-4">
        {R.addIndex(R.map)((area, i) => {
          const isRemoved = !!!R.find(
            R.propEq("koodiArvo", area.koodiarvo),
            props.values
          );
          const isAdded = !!!R.find(
            R.propEq("koodiArvo", area.koodiarvo),
            props.initialValues
          );

          const isInLupa = !isAdded;

          const customClasses = [
            isAdded ? "is-added" : "",
            isInLupa ? "is-in-lupa" : "",
            isRemoved ? "is-removed" : ""
          ];
          return (
            <li key={`label-${i}`} className={customClasses.join(" ")}>
              {area.label}
            </li>
          );
        }, areaData)}
      </ul>
    );
  };

  return (
    <div>
      {!props.values && (
        <h4>{props.intl.formatMessage(wizardMessages.noArea)}</h4>
      )}

      <div className="flex pb-4">
        {maakunnat && (
          <div className="flex-1 pr-4">
            <h4 className="pt-4 border-b-2 border-solid border-green-200">
              {props.intl.formatMessage(wizardMessages.counties)}
            </h4>
            {getListOfSelectedValues(maakunnat)}
          </div>
        )}

        {kunnat && (
          <div className="flex-1 pl-4">
            <h4 className="pt-4 border-b-2 border-solid border-green-400">
              {props.intl.formatMessage(wizardMessages.municipalities)}
            </h4>
            {getListOfSelectedValues(kunnat)}
          </div>
        )}
      </div>
    </div>
  );
});

Toimialuemuutokset.propTypes = {
  initialValues: PropTypes.array,
  values: PropTypes.array
};

export default injectIntl(Toimialuemuutokset);
