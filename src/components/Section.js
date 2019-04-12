import React from "react";
import PropTypes from "prop-types";
import { Kohde, Kohdenumero, Otsikko, Row } from "utils/UIComponents";
import { ContentContainer } from "modules/elements";

class Section extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Kohde>
        <ContentContainer>
          <Kohdenumero>{this.props.code}.</Kohdenumero>
          <Otsikko>{this.props.title}</Otsikko>
          {this.props.children}
        </ContentContainer>
      </Kohde>
    );
  }
}

Section.propTypes = {
  code: PropTypes.number,
  title: PropTypes.string
};

export default Section;
