import React from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import PropTypes from "prop-types";
import Lomake from "../../../../../../../components/02-organisms/Lomake";

const YhteenvetoYleisettiedot = React.memo(props => {
  return (
    <ExpandableRowRoot
      title={"Hakemuksen yleiset tiedot"}
      anchor={props.sectionId}
      changes={props.changeObjects.yhteenveto}
      disableReverting={false}
      hideAmountOfChanges={false}
      showCategoryTitles={true}
      isExpanded={true}
      sectionId={props.sectionId}
      onChangesRemove={props.onChangesRemove}
      onUpdate={props.onChangesUpdate}>
      <Lomake
        action="modification"
        anchor={props.sectionId}
        changeObjects={props.changeObjects.yhteenveto}
        onChangesUpdate={props.onChangesUpdate}
        path={["yhteenveto", "yleisetTiedot"]}
        rules={[]}
        showCategoryTitles={true}></Lomake>
    </ExpandableRowRoot>
  );
});

YhteenvetoYleisettiedot.propTypes = {
  changeObjects: PropTypes.object
};
export default YhteenvetoYleisettiedot;
