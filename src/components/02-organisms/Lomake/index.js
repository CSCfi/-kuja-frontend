import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "okm-frontend-components/dist/components/02-organisms/CategorizedListRoot";
import {getLomake} from "../../../services/lomakkeet";
import {join, map, path} from "ramda";
import {cloneDeep, isEqual} from "lodash";
import {useIntl} from "react-intl";
import {useMetadata} from "../../../stores/metadata";

async function markRequiredFields(lomake, changeObjects = [], rules = []) {
    let modifiedLomake = cloneDeep(lomake);
    const invalidFields = map(async rule => {
        console.log(rule);
        const isRequired = rule.isRequired(modifiedLomake, changeObjects);
        modifiedLomake = rule.markRequiredFields(modifiedLomake, isRequired);
        const isValid = await rule.isValid(modifiedLomake, changeObjects, isRequired)();
        modifiedLomake = rule.showErrors(modifiedLomake, isValid);
        return !isValid;
    }, rules).filter(Boolean);
    return {categories: modifiedLomake, invalidFields, ruleCount: rules.length};
}

const defaultProps = {
    changeObjects: [],
    uncheckParentWithoutActiveChildNodes: false
};

const Lomake = React.memo(
    ({
         action,
         anchor,
         changeObjects = defaultProps.changeObjects,
         data,
         metadata,
         isReadOnly,
         onChangesUpdate,
         path: _path,
         prefix = "",
         rules = [],
         rulesFn,
         showCategoryTitles = true,
         uncheckParentWithoutActiveChildNodes = defaultProps.uncheckParentWithoutActiveChildNodes
     }) => {
        const intl = useIntl();
        const [meta, metadataActions] = useMetadata();

        const lomakeId = `${anchor}.${prefix}.${join(".", _path || [])}.${action}`;

        const showValidationErrors =
            path(["lomakkeet", "latauskerrat", lomakeId], meta) > 1;

        useEffect(() => {
            metadataActions.registerLomakeLoad(lomakeId);
        }, [lomakeId, metadataActions]);

        const [lomakeWithRules, setLomakeWithRules] = useState([]);

        const lomake = useMemo(() => {

            return getLomake(
                action,
                data,
                isReadOnly,
                intl.locale,
                _path,
                prefix
            );
        }, [
            action,
            data,
            intl.locale,
            isReadOnly,
            _path,
            prefix]);

        useEffect( () => {
            (async () => {
                let result = {categories: lomake, invalidFields: [], ruleCount: 0};
                let _rules = Object.assign({}, rules);
               // cloneDeep(rules);
                if (rulesFn) {
                    _rules = rulesFn(lomake);
                }
                if (_rules.length) {
                    console.log(anchor);
                    result = await markRequiredFields(lomake, changeObjects, _rules);
                }
                setLomakeWithRules({
                    categories: [],
                    invalidFields: result.invalidFields.length,
                    ruleCount: result.ruleCount,
                    metadata
                });
            })()
        }, [lomake, anchor, changeObjects, metadata, rules, rulesFn]);

        /*
              console.log('kategoriat', categories);
              let result = { categories, invalidFields: [], ruleCount: 0 };
              let _rules = cloneDeep(rules);
              if (rulesFn) {
                _rules = rulesFn(categories);
              }
              else if (rulesAsync) {
               // _rules = await rulesAsync(categories);
                console.log(_rules);
              }
              if (_rules.length) {
                result = markRequiredFields(categories, changeObjects, _rules);
              }
              return {
                categories: result.categories,
                invalidFields: result.invalidFields.length,
                ruleCount: result.ruleCount,
                metadata
              };
            }, [
              action,
              changeObjects,
              data,
              intl.locale,
              isReadOnly,
              metadata,
              _path,
              prefix,
              rules,
              rulesFn,
              rulesAsync
            ]);*/
        if (
            lomakeWithRules.categories &&
            lomakeWithRules.invalidFields !== undefined &&
            onChangesUpdate
        ) {
            return (
                <React.Fragment>
                    <div className="p-8">
                        <CategorizedListRoot
                            anchor={anchor}
                            categories={lomakeWithRules.categories}
                            changes={changeObjects}
                            onUpdate={onChangesUpdate}
                            showCategoryTitles={showCategoryTitles}
                            showValidationErrors={showValidationErrors}
                            uncheckParentWithoutActiveChildNodes={
                                uncheckParentWithoutActiveChildNodes
                            }
                        />
                    </div>
                </React.Fragment>
            );
        } else {
            return <div>Nothing to show.</div>;
        }
    },
    (prevState, nextState) => {
        const isSameOld =
            isEqual(prevState.changeObjects, nextState.changeObjects) &&
            isEqual(prevState.data, nextState.data);
        return isSameOld;
    }
);

Lomake.propTypes = {
    anchor: PropTypes.string,
    changeObjects: PropTypes.array,
    data: PropTypes.object,
    metadata: PropTypes.object,
    onChangesUpdate: PropTypes.func,
    path: PropTypes.array,
    // Is used for matching the anchor of reasoning field to the anchor of
    // original change object.
    prefix: PropTypes.string,
    rules: PropTypes.array,
    // This is useful for dynamic forms.
    rulesFn: PropTypes.func,
    uncheckParentWithoutActiveChildNodes: PropTypes.bool
};

export default Lomake;
