import React from "react";
import ExpandableRowRoot from "OKM-frontend-components/dist/components/02-organisms/ExpandableRowRoot";
import PropTypes from "prop-types";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { yleisettiedot } from "../../../../../../../services/lomakkeet/taloudelliset/rules";

const TaloudellisetYleisettiedot = React.memo(
  ({
    changeObjects,
    isReadOnly,
    onChangesRemove,
    onChangesUpdate,
    sectionId
  }) => {
    return (
      <ExpandableRowRoot
        title={"Yleiset tiedot"}
        anchor={"taloudelliset_yleisettiedot"}
        key={`taloudelliset-yleisetiedot`}
        categories={[]}
        changes={changeObjects}
        disableReverting={isReadOnly}
        hideAmountOfChanges={true}
        showCategoryTitles={true}
        isExpanded={true}
        sectionId={sectionId}
        onChangesRemove={onChangesRemove}
        onUpdate={onChangesUpdate}>
        <Lomake
          action="yleisettiedot"
          anchor={sectionId}
          changeObjects={changeObjects}
          onChangesUpdate={onChangesUpdate}
          isReadOnly={isReadOnly}
          path={["taloudelliset"]}
          rules={yleisettiedot}
          showCategoryTitles={true}></Lomake>
      </ExpandableRowRoot>
    );
  }
);

TaloudellisetYleisettiedot.propTypes = {
  changeObjects: PropTypes.array,
  onChangesRemove: PropTypes.func,
  onChangeUpdate: PropTypes.func,
  isReadOnly: PropTypes.bool
};

export default TaloudellisetYleisettiedot;
