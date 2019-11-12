export function getAdditionForm(
  addPeopleFormCallback,
  isReadOnly,
  peopleForms
) {
  const code = 5;
  return [
    {
      anchor: code,
      styleClasses: ["px-10 py-10"],
      components: [
        {
          anchor: "perustaso-title",
          name: "StatusTextRow",
          properties: {
            title:
              "Perustason ammattipätevyyskoulutusta antavan koulutuskeskuksen tehtävä "
          }
        }
      ],
      categories: [
        tehtavanTarpeellisuus(1, isReadOnly),
        voimassaOlo(2, isReadOnly),
        suunnitelma(3, isReadOnly),
        johtaja(4, isReadOnly),
        opettajien(
          addPeopleFormCallback,
          peopleForms,
          5,
          "Selvitys perustason ammattipätevyyskoulutusen opettajien kelpoisuuksista ja työkokemuksista",
          isReadOnly
        ),
        ajoneuvoKanta(6, isReadOnly),
        muutOpetusvalineet(7, isReadOnly)
      ]
    }
  ];
}
