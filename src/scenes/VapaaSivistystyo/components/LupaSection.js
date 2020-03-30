import React from "react";
import Section from "../../../components/03-templates/Section";
import PropTypes from "prop-types";

const LupaSection = props => {
  const { kohde } = props;

  if (kohde.heading && kohde.values && kohde.values.length > 0) {
    const { heading, values } = kohde;
    const elements = values.map((item,i) => (<p key={i}>{item}</p>));
    return (
      <Section title={heading}>
        {elements}
      </Section>
    )
  } else {
    return (<></>)
  }
};

LupaSection.propTypes = {
  kohde: PropTypes.object
}

export default LupaSection;
