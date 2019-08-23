export const short = 'short';
export const long = 'long';
export const autocompleteShortStyles = {
  dropdownIndicator: base => ({
    ...base,
    padding: 4
  }),
  clearIndicator: base => ({
    ...base,
    padding: 4
  }),
  valueContainer: base => ({
    ...base,
    maxHeight: "2.4rem",
  }),
  input: base => ({
    ...base,
    margin: 0,
    padding: 0,
    maxHeight: "2.4rem",
    transform: `translateY(${'-15%'})`
  }),
  control: (styles) => {
    return {
      ...styles,
      backgroundColor: "white",
      height: "2.4rem",
      minHeight: 'fit-content'
    }
  },
}
