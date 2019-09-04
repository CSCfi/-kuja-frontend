import React, { useEffect, useState } from "react";
import { getAddPeopleForm } from "../../../../../services/lomakkeet/perustelut/koulutukset";
import CategorizedListRoot from "../../../../02-organisms/CategorizedListRoot";

const LomakeHenkilonLisaamiseen = () => {
  const [lomake, setLomake] = useState([]);

  useEffect(() => {
    setLomake([getAddPeopleForm(1)]);
  }, []);

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

export default LomakeHenkilonLisaamiseen;
