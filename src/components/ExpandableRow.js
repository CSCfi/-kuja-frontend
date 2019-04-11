import React from "react";
import { Arrow, Heading, Span, SpanMuutos } from "utils/UIComponents";
import arrow from "static/images/koulutusala-arrow.svg";
import PropTypes from "prop-types";
import ExpandableRowContent from "components/ExpandableRowContent";
import { COLORS } from "modules/styles";

class ExpandableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldBeExpanded: props.shouldBeExpanded
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      shouldBeExpanded: !this.state.shouldBeExpanded
    });
  };

  render() {
    return (
      <div>
        <Heading onClick={this.toggle}>
          <Arrow
            src={arrow}
            alt={this.state.shouldBeExpanded ? "Kutista rivi" : "Laajenna rivi"}
            rotated={this.state.shouldBeExpanded}
          />
          <Span>{this.props.code}</Span>
          <Span>{this.props.title}</Span>
          {this.props.changes.length ? (
            <SpanMuutos>
              Muutokset:&nbsp;
              <Span color={COLORS.OIVA_PURPLE}>
                {this.props.changes.length}
              </Span>
            </SpanMuutos>
          ) : null}
        </Heading>
        {this.state.shouldBeExpanded && (
          <ExpandableRowContent
            code={this.props.code}
            article={this.props.article}
            changes={this.props.changes}
            categories={this.props.categories}
            areaCode={this.props.areaCode}
            onFormModification={this.props.onFormModification}
          />
        )}
      </div>
    );
  }
}

ExpandableRow.propTypes = {
  areaCode: PropTypes.string,
  article: PropTypes.object,
  code: PropTypes.string,
  categories: PropTypes.array,
  changes: PropTypes.array,
  number: PropTypes.number,
  onFormModification: PropTypes.func,
  shouldBeExpanded: PropTypes.bool,
  title: PropTypes.string
};

export default ExpandableRow;
