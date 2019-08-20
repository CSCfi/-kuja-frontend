import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForOpetuskieletList } from "../../../../../../../services/kielet/opetuskieletUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import { parseLocalizedField } from "../../../../../../../modules/helpers";

const Opetuskielet = React.memo(props => {
  const sectionId = "opetuskielet";
  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);
  const [state, setState] = useState([]);
  const [locale, setLocale] = useState("FI");
  const { onUpdate } = props;

  useEffect(() => {
    const tmpState = [];
    R.addIndex(R.map)(kieli => {
      const areaCode = kieli.koodiarvo || kieli.koodiArvo;
      const title = parseLocalizedField(kieli.metadata, locale);
      tmpState.push({ areaCode, title });
    }, props.opetuskielet);
    setState(tmpState);
  }, [
    props.opetuskielet,
    locale,
    props.kohde,
    props.maaraystyyppi,
    props.changes,
    props.lupa.kohteet
  ]);

  useEffect(() => {
    const getCategories = opetuskielet => {
      if (opetuskielet.items)
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
        }, opetuskielet.items);
    };

    setCategories(
      getCategories(
        getDataForOpetuskieletList(
          props.opetuskielet,
          props.kohde,
          props.changes,
          locale
        )
      )
    );
  }, [
    props.opetuskielet,
    props.kohde,
    props.changes,
    locale,
    props.maaraystyyppi
  ]);

  const removeChanges = (...payload) => {
    return saveChanges({ index: payload[2], changes: [] });
  };

  useEffect(() => {
    setChanges(
      R.map(muutos => {
        return muutos.meta.changeObj;
      }, props.changes)
    );
  }, [props.changes]);

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  useEffect(() => {
    onUpdate({
      sectionId,
      payload: { categories, changes, opetuskielet: props.opetuskielet, state }
    });
  }, [categories, onUpdate, changes, props.opetuskielet, state]);

  const saveChanges = payload => {
    setChanges(payload.changes);
  };

  return (
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
  );
});

Opetuskielet.defaultProps = {
  changes: [],
  opetuskielet: []
};

Opetuskielet.propTypes = {
  changes: PropTypes.array,
  opetuskielet: PropTypes.array,
  onUpdate: PropTypes.func,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};

export default injectIntl(Opetuskielet);
