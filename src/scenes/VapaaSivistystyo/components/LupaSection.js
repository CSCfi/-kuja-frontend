import React from "react";
import Section from "../../../components/03-templates/Section";

const generateSectionElement = (heading, values) => {
  const elements = values.map(item => (<p>{item}</p>));
  return (
    <Section title={heading}>
      {elements}
    </Section>
  )
};

const LupaSection = props => {
  const { kohde } = props;

  if (kohde.heading && kohde.values && kohde.values.length > 0) {
    const { heading, values } = kohde;
    return generateSectionElement(heading, values);
  } else {
    return (<></>)
  }
};

export default LupaSection;
