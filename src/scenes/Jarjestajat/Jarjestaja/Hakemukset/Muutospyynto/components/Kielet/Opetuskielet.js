import React, { useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { getDataForOpetuskieletList } from "../../../../../../../utils/opetuskieletUtil";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import * as R from "ramda";

const Opetuskielet = React.memo(props => {
  const intl = useIntl();
  const sectionId = "kielet_opetuskielet";
  const { onChangesRemove, onChangesUpdate } = props;

  const opetuskieletData = useMemo(() => {
    return getDataForOpetuskieletList(
      R.sortBy(R.prop("koodiArvo"), R.values(props.opetuskielet)),
      props.kohde,
      R.toUpper(intl.locale)
    );
  }, [intl.locale, props.kohde, props.opetuskielet]);

  return (
    <React.Fragment>
      <ExpandableRowRoot
        anchor={sectionId}
        key={`expandable-row-root`}
        categories={[]}
        changes={props.changeObjects}
        onChangesRemove={onChangesRemove}
        onUpdate={onChangesUpdate}
        sectionId={sectionId}
        title={intl.formatMessage(wizardMessages.teachingLanguages)}
        isExpanded={true}>
        {opetuskieletData && (
          <Lomake
            action="modification"
            anchor={sectionId}
            changeObjects={props.changeObjects}
            data={{
              kohde: props.kohde,
              maaraystyyppi: props.maaraystyyppi,
              opetuskieletData
            }}
            onChangesUpdate={onChangesUpdate}
            path={["kielet", "opetuskielet"]}
            rules={[]}
            showCategoryTitles={true}></Lomake>
        )}
      </ExpandableRowRoot>
    </React.Fragment>
  );
});

Opetuskielet.defaultProps = {
  changeObjects: []
};

Opetuskielet.propTypes = {
  changeObjects: PropTypes.array,
  opetuskielet: PropTypes.array,
  onChangesUpdate: PropTypes.func,
  onChangesRemove: PropTypes.func,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};

export default Opetuskielet;
