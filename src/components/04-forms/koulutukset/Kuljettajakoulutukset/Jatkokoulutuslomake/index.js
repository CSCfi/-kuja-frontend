import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getAddPeopleForm,
  getKuljettajienJatkokoulutuslomake
} from "../../../../../services/lomakkeet/perustelut/koulutukset";
import CategorizedListRoot from "../../../../02-organisms/CategorizedListRoot";
import * as R from "ramda";

const defaultProps = {
  changeObjects: []
};

const KuljettajienJatkokoulutuslomake = ({
  changeObjects = defaultProps.changeObjects
}) => {
  const [lomake, setLomake] = useState(getKuljettajienJatkokoulutuslomake());
  const [peopleForms, setPeopleForms] = useState([]);

  useEffect(() => {
    const addPeopleForm = () => {
      setPeopleForms(prevForms => {
        return R.insert(-1, getAddPeopleForm(prevForms.length + 1))(prevForms);
      });
    };

    setLomake(getKuljettajienJatkokoulutuslomake(addPeopleForm, peopleForms));
  }, [peopleForms]);

  return (
    <CategorizedListRoot
      anchor="lomake"
      categories={lomake}
      changes={changeObjects}
      onUpdate={() => {}}
      showCategoryTitles={true}
    />
  );
};

KuljettajienJatkokoulutuslomake.propTypes = {
  changeObjects: PropTypes.array
};

export default KuljettajienJatkokoulutuslomake;
