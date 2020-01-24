import React from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import PropTypes from "prop-types";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { yleisettiedot } from "../../../../../../../services/lomakkeet/taloudelliset/rules";

const TaloudellisetYleisettiedot = React.memo(
  ({ changeObjects, isReadOnly, onChangesUpdate, sectionId }) => {
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
        onUpdate={onChangesUpdate}>
        <Lomake
          action="yleisettiedot"
          anchor={sectionId}
          changeObjects={changeObjects}
          onChangesUpdate={onChangesUpdate}
          path={["taloudelliset"]}
          rules={yleisettiedot}
          showCategoryTitles={true}></Lomake>
      </ExpandableRowRoot>
    );
  }
);

TaloudellisetYleisettiedot.propTypes = {
  changeObjects: PropTypes.array,
  isReadOnly: PropTypes.bool
};

export default TaloudellisetYleisettiedot;
