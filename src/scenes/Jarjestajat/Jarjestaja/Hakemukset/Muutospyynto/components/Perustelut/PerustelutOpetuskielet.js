import React, { useEffect, useState, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForOpetuskieletList } from "../../../../../../../services/kielet/opetuskieletUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { curriedGetAnchorPartsByIndex } from "../../../../../../../utils/common";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const PerustelutOpetuskielet = React.memo(props => {
  /**
   * Section id is automatically splitted.
   */
  const sectionId = "perustelut_kielet_opetuskielet";
  const [locale, setLocale] = useState("FI");
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;

  const getCategories = useMemo(() => {
    return opetuskielet => {
      if (opetuskielet.items)
        return R.map(item => {
          let structure = null;
          if (
            R.includes(
              item.code,
              curriedGetAnchorPartsByIndex(props.changeObjects.opetuskielet, 1)
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
                  title:
                    "Perustele lyhyesti miksi tälle muutokselle on tarvetta",
                  components: [
                    {
                      anchor: "A",
                      name: "TextBox",
                      properties: {
                        isReadOnly: props.isReadOnly,
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
    };
  }, [props.changeObjects.opetuskielet, props.kohde, props.maaraystyyppi]);

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  useEffect(() => {
    onStateUpdate(
      {
        categories: getCategories(
          getDataForOpetuskieletList(props.opetuskielet, props.kohde, locale)
        )
      },
      sectionId
    );
  }, [getCategories, locale, onStateUpdate, props.kohde, props.opetuskielet]);

  return (
    <React.Fragment>
      {props.stateObject.categories ? (
        <ExpandableRowRoot
          anchor={sectionId}
          key={`expandable-row-root`}
          categories={props.stateObject.categories}
          changes={props.changeObjects.perustelut}
          disableReverting={props.isReadOnly}
          onChangesRemove={onChangesRemove}
          onUpdate={onChangesUpdate}
          sectionId={sectionId}
          title={props.intl.formatMessage(wizardMessages.teachingLanguages)}
          isExpanded={true}
        />
      ) : null}
    </React.Fragment>
  );
});

PerustelutOpetuskielet.defaultProps = {
  changeObjects: {},
  stateObject: {}
};

PerustelutOpetuskielet.propTypes = {
  changeObjects: PropTypes.object,
  opetuskielet: PropTypes.array,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  isReadOnly: PropTypes.bool,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  stateObject: PropTypes.object
};

export default injectIntl(PerustelutOpetuskielet);
