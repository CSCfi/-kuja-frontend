import React from "react";
import { render } from "react-testing-library";
import CheckboxWithLabel from "./index";

const handleChanges = () => {
  console.info("Handing changes...");
  return true;
};

it("renders the correct label", () => {
  const labelText = "Label text";
  const div = document.createElement("div");
  const { getByLabelText } = render(
    <CheckboxWithLabel name="test-checkbox" onChanges={handleChanges}>
      {labelText}
    </CheckboxWithLabel>,
    div
  );
  expect(getByLabelText(labelText)).toBeInTheDocument();
//   expect(getByTestId('checkbox')).toBeInTheDocument();
});

// it("renders as checked", () => {
//   const div = document.createElement("div");
//   const { debug } = ReactDOM.render(
//     <CheckboxWithLabel name="test-checkbox" onChanges={handleChanges} />,
//     div
//   );
//   debug();
// });
