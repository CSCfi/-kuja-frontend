import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import * as R from "ramda";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { useIntl } from "react-intl";
import { getRules } from "../../../../../../../services/lomakkeet/perustelut/kielet/tutkintokielet/rules";

const PerustelutTutkintokielet = React.memo(props => {
  const intl = useIntl();
  const sectionId = "perustelut_kielet_tutkintokielet";
  const { onChangesRemove, onChangesUpdate } = props;
  const [isChanges, setIsChanges] = useState(false);

  useEffect(() => {
    R.forEachObjIndexed(item => {
      if (!R.isEmpty(item)) {
        setIsChanges(true);
      }
    }, props.changeObjects.tutkintokielet || []);
  });

  if (isChanges) {
    return (
      <React.Fragment>
        <h2 className="py-4">
          {intl.formatMessage(wizardMessages.tutkintokielet)}
        </h2>
        {R.addIndex(R.map)((areaCode, index) => {
          const changeObjects = props.changeObjects.tutkintokielet[areaCode];
          if (changeObjects.length > 0) {
            return (
              <ExpandableRowRoot
                anchor={`${sectionId}_${areaCode}`}
                key={`expandable-row-root-${index}`}
                categories={[]}
                changes={
                  props.changeObjects.perustelut.tutkintokielet[areaCode]
                }
                disableReverting={props.isReadOnly}
                onChangesRemove={onChangesRemove}
                onUpdate={onChangesUpdate}
                sectionId={sectionId}
                showCategoryTitles={true}
                code={areaCode}
                title={"Testi"}
                isExpanded={true}
                hideAmountOfChanges={false}>
                <Lomake
                  action="reasoning"
                  anchor={`${sectionId}_${areaCode}`}
                  changeObjects={
                    props.changeObjects.perustelut.tutkintokielet[areaCode]
                  }
                  data={{
                    areaCode,
                    changeObjectsPage1: changeObjects,
                    maaraykset: props.maaraykset,
                    tutkinnot: props.tutkinnot
                  }}
                  onChangesUpdate={onChangesUpdate}
                  path={["perustelut", "kielet", "tutkintokielet"]}
                  rulesFn={getRules}
                  showCategoryTitles={true}></Lomake>
              </ExpandableRowRoot>
            );
          }
        }, R.keys(props.changeObjects.tutkintokielet))}
      </React.Fragment>
    );
  }
  return <React.Fragment />;
});

PerustelutTutkintokielet.defaultValues = {
  changeObjects: {},
  isReadOnly: false,
  maaraykset: []
};

PerustelutTutkintokielet.propTypes = {
  changeObjects: PropTypes.object,
  lomakkeet: PropTypes.object,
  maaraykset: PropTypes.array,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  tutkinnot: PropTypes.object
};

export default PerustelutTutkintokielet;
