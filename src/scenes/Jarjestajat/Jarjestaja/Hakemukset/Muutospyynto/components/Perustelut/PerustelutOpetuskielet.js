import React, { useCallback, useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForOpetuskieletList } from "../../../../../../../services/kielet/opetuskieletUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { curriedGetAnchorPartsByIndex } from "../../../../../../../utils/common";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import { parseLocalizedField } from "../../../../../../../modules/helpers";

const PerustelutOpetuskielet = React.memo(props => {
  const sectionId = "opetuskielet";
  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);
  const [opetuskielet, setOpetuskieletdata] = useState([]);
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

  const getCategories = useCallback(
    opetuskielet => {
      if (opetuskielet.items)
        return R.map(item => {
          let structure = null;
          if (
            R.includes(
              item.code,
              curriedGetAnchorPartsByIndex(props.changes, 1)
            )
          ) {
            structure = {
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
                  name: "StatusTextRow",
                  properties: {
                    title: item.title,
                    labelStyles: {
                      addition: isAdded,
                      removal: isRemoved,
                      custom: Object.assign({}, item.isInLupa ? isInLupa : {})
                    }
                  }
                }
              ],
              categories: [
                {
                  anchor: "vapaa-tekstikentta",
                  title: "Perustele lyhyesti miksi tälle muutokselle on tarvetta",
                  components: [
                    {
                      anchor: "A",
                      name: "TextBox",
                      properties: {
                        placeholder: "Sana on vapaa..."
                      }
                    }
                  ]
                }
              ]
            };
          }
          return structure;
        }, opetuskielet.items).filter(Boolean);
    },
    [props.changes, props.kohde, props.maaraystyyppi]
  );

  useEffect(() => {
    setOpetuskieletdata(
      R.sortBy(R.prop("koodiArvo"), R.values(props.opetuskielet))
    );
  }, [props.opetuskielet]);

  useEffect(() => {
    const tmpState = [];
    R.addIndex(R.map)((kieli, i) => {
      const areaCode = kieli.koodiarvo || kieli.koodiArvo;
      const categories = getCategories(
        getDataForOpetuskieletList(props.opetuskielet, props.kohde, locale)
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
    props.opetuskielet
  ]);

  useEffect(() => {
    setCategories(
      getCategories(
        getDataForOpetuskieletList(props.opetuskielet, props.kohde, locale)
      )
    );
  }, [
    getCategories,
    props.opetuskielet,
    props.kohde,
    props.changes,
    locale,
    props.maaraystyyppi
  ]);

  useEffect(() => {
    console.info(props.changes);
    setChanges(props.changes);
  }, [props.changes]);

  const removeChanges = (...payload) => {
    return saveChanges({ index: payload[2], changes: [] });
  };

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

PerustelutOpetuskielet.propTypes = {
  changes: PropTypes.array,
  opetuskielet: PropTypes.array,
  onUpdate: PropTypes.func,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};

export default injectIntl(PerustelutOpetuskielet);
