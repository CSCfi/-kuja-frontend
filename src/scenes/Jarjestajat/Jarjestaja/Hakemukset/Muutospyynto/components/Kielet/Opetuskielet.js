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
        }, opetuskielet.items);
    };

  useEffect(() => {
    setOpetuskieletdata(
      R.sortBy(R.prop("koodiArvo"), R.values(props.kielet.opetuskielet))
    );
  }, [props.kielet]);

  useEffect(() => {
    const tmpState = [];
    R.addIndex(R.map)((kieli, i) => {
      const areaCode = kieli.koodiarvo || kieli.koodiArvo;
      const categories = getCategories(
        getDataForOpetuskieletList(
          props.kielet.opetuskielet,
          props.kohde,
          locale
        )
      );
      const title = parseLocalizedField(kieli.metadata, locale);
      tmpState.push({ areaCode, categories, title });
    }, opetuskielet);
    setState(tmpState);
  }, [
    opetuskielet,
    locale,
    props.kohde,
    props.maaraystyyppi,
    getCategories,
    props.lupa.kohteet,
    props.kielet.opetuskielet
  ]);

  useEffect(() => {
    setCategories(
      getCategories(
        getDataForOpetuskieletList(
          props.opetuskielet,
          props.kohde,
          props.intl.locale
        )
      )
    );
  }, [
    props.kielet.opetuskielet,
    props.kohde,
    props.changes,
    locale,
    props.maaraystyyppi
  ]);

  useEffect(() => {
    setChanges(props.backendChanges);
  }, [props.backendChanges]);

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
      changes,
      items: [...state],
      sectionId
    });
  }, [changes, onUpdate, state]);

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
  backgroundChanges: PropTypes.array,
  kielet: PropTypes.object,
  onUpdate: PropTypes.func,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};

export default injectIntl(Opetuskielet);
