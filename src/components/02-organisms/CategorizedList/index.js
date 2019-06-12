import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckboxWithLabel from "../../01-molecules/CheckboxWithLabel";
import Dropdown from "../../00-atoms/Dropdown";
import RadioButtonWithLabel from "../../01-molecules/RadioButtonWithLabel";
import _ from "lodash";
import * as R from "ramda";

const updateCategories = (path, component, categories) => {
  return R.assocPath(
    path.concat("properties"),
    component.properties,
    categories
  );
};

const CategorizedList = props => {
  const [categories, setCategories] = useState(props.categories);

  const handleChildComponent = (path, component, shouldParentBeChecked) => {
    console.info("handling child call");
    let categoriesClone = R.clone(categories);
    const modifiedComponent = {
      ...R.path(path, categoriesClone),
      properties: Object.assign({}, component.properties, {
        isChecked: shouldParentBeChecked
      })
    };
    categoriesClone = updateCategories(
      path,
      modifiedComponent,
      categoriesClone
    );
    setCategories(categoriesClone);
  };

  useEffect(() => {
    console.info(props.id);
    // console.info(R.difference(props.categories || [], categories || []));
    // if (R.difference(props.categories || [], categories || []).length) {
    //   setCategories(props.categories);
    // }
  }, [props.changes]);

  const handleChanges = (payload, changes) => {
    console.info("Handling changes...", payload, changes);
    const component = R.path(payload.path, categories);
    if (component.name === "CheckboxWithLabel") {
      let categoriesClone = R.clone(categories);
      if (props.parentCategory) {
        const modifiedComponent = {
          ...R.path(payload.path, categoriesClone),
          properties: Object.assign({}, component.properties, changes)
        };
        categoriesClone = R.assocPath(
          payload.path.concat("properties"),
          modifiedComponent.properties,
          categoriesClone
        );
        const shouldParentBeChecked = !!_.map(categoriesClone, category => {
          return _.map(category.components, component => {
            return component.name === "CheckboxWithLabel"
              ? component.properties.isChecked
              : false;
          }).filter(Boolean)[0];
        }).filter(Boolean).length;
        if (shouldParentBeChecked) {
          _.map(props.parentCategory.components, (component, i) => {
            if (component.name === "CheckboxWithLabel") {
              props.callParentComponent(
                [props.fullPath[0], "components", 0],
                component,
                shouldParentBeChecked
              );
            }
          });
        }
      } else {
        const modifiedComponent = {
          ...R.path(payload.path, categories),
          properties: Object.assign({}, component.properties, changes)
        };
        categoriesClone = R.assocPath(
          payload.path.concat("properties"),
          modifiedComponent.properties,
          categoriesClone
        );
      }
      // Walk through the child checkboxes
      _.map(categories[payload.path[0]].categories, (category, i) => {
        _.map(category.components, (component, ii) => {
          const path = [payload.path[0]]
            .concat(["categories", i])
            .concat(["components", ii]);
          if (component.name === "CheckboxWithLabel") {
            const modifiedComponent = {
              ...R.path(path, categories),
              properties: Object.assign({}, component.properties, {
                isChecked: component.properties.isChecked
              })
            };
            categoriesClone = updateCategories(
              path,
              modifiedComponent,
              categoriesClone
            );
          }
        });
      });
      setCategories(categoriesClone);
    } else if (component.name === "RadioButtonWithLabel") {
      let categoriesClone = R.clone(categories);
      _.map(props.parentCategory.categories, (category, i) => {
        _.map(category.components, (component, ii) => {
          const path = [i, "components", ii];
          if (component.name === "RadioButtonWithLabel") {
            if (R.equals(path, payload.path)) {
              const modifiedComponent = {
                ...R.path(payload.path, categoriesClone),
                properties: Object.assign({}, component.properties, changes)
              };
              categoriesClone = R.assocPath(
                path.concat("properties"),
                modifiedComponent.properties,
                categoriesClone
              );
            } else {
              const modifiedComponent = {
                ...R.path(path, categoriesClone),
                properties: Object.assign({}, component.properties, {
                  isChecked: false
                })
              };
              categoriesClone = R.assocPath(
                path.concat("properties"),
                modifiedComponent.properties,
                categoriesClone
              );
            }
          }
        });
      });
      setCategories(categoriesClone);
    }
  };

  return (
    <div>
      {_.map(categories, (category, i) => {
        return (
          <div key={i} className="px-6 select-none">
            {(category.code || category.title) && (
              <div className="p-2">
                <strong>
                  {category.code && (
                    <span className="mr-4">{category.code}</span>
                  )}
                  <span>{category.title}</span>
                </strong>
              </div>
            )}
            <div className="flex items-center justify-between border-b border-solid border-grey-100">
              {_.map(category.components, (component, ii) => {
                const { properties } = component;
                const idSuffix = `${i}-${ii}`;
                return (
                  <React.Fragment key={`item-${ii}`}>
                    {component.name === "CheckboxWithLabel" && (
                      <div className="px-2">
                        <CheckboxWithLabel
                          id={`checkbox-with-label-${idSuffix}`}
                          name={properties.name}
                          isChecked={properties.isChecked}
                          onChanges={handleChanges}
                          payload={{
                            id: `checkbox-with-label-${idSuffix}`,
                            path: props.path.concat([i, "components", ii])
                          }}
                          labelStyles={properties.labelStyles}
                        >
                          <span>{properties.code}</span>
                          <span className="ml-4">{properties.title}</span>
                        </CheckboxWithLabel>
                      </div>
                    )}
                    {component.name === "RadioButtonWithLabel" && (
                      <div className="px-2">
                        <RadioButtonWithLabel
                          id={`radio-button-with-label-${idSuffix}`}
                          name={properties.name}
                          isChecked={properties.isChecked}
                          onChanges={handleChanges}
                          payload={{
                            id: `radio-button-with-label-${idSuffix}`,
                            path: props.path.concat([i, "components", ii])
                          }}
                          value={properties.value}
                        >
                          <span>{properties.code}</span>
                          <span className="ml-4">{properties.title}</span>
                        </RadioButtonWithLabel>
                      </div>
                    )}
                    {component.name === "Dropdown" && (
                      <div className="px-2">
                        <Dropdown
                          id={`dropdown-${idSuffix}`}
                          options={properties.options}
                          isDisabled={
                            !(
                              (category.components[ii - 1] || {}).properties ||
                              {}
                            ).isChecked
                          }
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <CategorizedList
              categories={category.categories}
              changes={[]}
              id={`${props.id}-${category.code}`}
              callParentComponent={handleChildComponent}
              shouldBeExpanded={false}
              path={props.path}
              fullPath={[i, "categories"].concat(props.path)}
              parentCategory={category}
            />
          </div>
        );
      })}
    </div>
  );
};

CategorizedList.defaultProps = {
  path: []
};

CategorizedList.propTypes = {
  categories: PropTypes.array,
  onChanges: PropTypes.func,
  parentCategory: PropTypes.object,
  path: PropTypes.array
};

export default CategorizedList;
