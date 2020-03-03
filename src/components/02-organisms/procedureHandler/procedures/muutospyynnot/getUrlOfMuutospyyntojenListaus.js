export const getUrlOfMuutospyyntojenListaus = {
  input: ["ytunnus"],
  run: ({ ytunnus }) => {
    return `/jarjestajat/${ytunnus}/jarjestamislupa-asia`;
  }
};
