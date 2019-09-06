import React, { useEffect, useState, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForOpetuskieletList } from "../../../../../../../services/kielet/opetuskieletUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const Opetuskielet = React.memo(props => {
  const sectionId = "kielet_opetuskielet";
  const [changes, setChanges] = useState();
  const [locale, setLocale] = useState("FI");
  const { onUpdate } = props;

  const opetuskieletData = useMemo(() => {
    return getDataForOpetuskieletList(
      R.sortBy(R.prop("koodiArvo"), R.values(props.opetuskielet)),
      props.kohde,
      locale
    );
  }, [locale, props.kohde, props.opetuskielet]);

  const categories = useMemo(() => {
    return R.map(item => {
      return {
        anchor: item.code,
        meta: {
          isInLupa: item.isInLupa,
          kuvaus: item.title,
          kohde: props.kohde,
          maaraystyyppi: props.maaraystyyppi,
          meta: item.meta
        },
        components: [
          {
            anchor: "A",
            name: "CheckboxWithLabel",
            properties: {
              name: "CheckboxWithLabel",
              isChecked: item.shouldBeSelected,
              title: item.title,
              labelStyles: {
                addition: isAdded,
                removal: isRemoved,
                custom: Object.assign({}, item.isInLupa ? isInLupa : {})
              }
            }
          }
        ]
      };
    }, opetuskieletData.items);
  }, [opetuskieletData, props.kohde, props.maaraystyyppi]);

  useEffect(() => {
    setChanges(props.changeObjects);
  }, [props.changeObjects]);

  const removeChanges = (...payload) => {
    return saveChanges({ index: payload[2], changes: [] });
  };

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  useEffect(() => {
    if (categories && Array.isArray(changes)) {
      onUpdate({
        sectionId,
        state: {
          categories,
          changes
        }
      });
    }
  }, [categories, changes, onUpdate]);

  const saveChanges = payload => {
    setChanges(payload.changes);
  };

  return (
    <React.Fragment>
      {Array.isArray(changes) && (
        <ExpandableRowRoot
          anchor={"opetuskieli"}
          key={`expandable-row-root`}
          categories={categories}
          changes={changes}
          index={0}
          onChangesRemove={removeChanges}
          onUpdate={saveChanges}
          sectionId={sectionId}
          title={props.intl.formatMessage(wizardMessages.teachingLanguages)}
          isExpanded={true}
        />
      )}
    </React.Fragment>
  );
});

Opetuskielet.defaultProps = {
  changeObjects: []
};

Opetuskielet.propTypes = {
  changeObjects: PropTypes.array,
  opetuskielet: PropTypes.array,
  onUpdate: PropTypes.func,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};

export default injectIntl(Opetuskielet);
