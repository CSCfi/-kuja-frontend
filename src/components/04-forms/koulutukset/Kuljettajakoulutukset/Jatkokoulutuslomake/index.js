import React, { useEffect, useState } from "react";
import {
  getAddPeopleForm,
  getKuljettajienJatkokoulutuslomake
} from "../../../../../services/lomakkeet/perustelut/koulutukset";
import CategorizedListRoot from "../../../../02-organisms/CategorizedListRoot";
import * as R from "ramda";

const KuljettajienJatkokoulutuslomake = () => {
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
    <div className="px-20">
      <CategorizedListRoot
        anchor="lomake"
        categories={lomake}
        changes={[]}
        onUpdate={() => {}}
        showCategoryTitles={true}
      />
    </div>
  );
};

export default KuljettajienJatkokoulutuslomake;
