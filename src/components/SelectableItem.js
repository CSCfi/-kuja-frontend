import React from "react";
import PropTypes from "prop-types";
import Checkbox from "components/Checkbox";
import { ContainerMs1 } from "utils/UIComponents";

class SelectableItem extends React.Component {
  constructor() {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange = () => {
    this.props.onStatusChange(this.props.item);
  };

  render() {
    const layoutClasses = [
      this.props.item.isAdded && "is-added",
      this.props.item.isRemoved && "is-removed",
      this.props.item.hasPermission && "is-in-lupa"
    ]
      .filter(Boolean)
      .join(",");
    return (
      <label className={layoutClasses}>
        <Checkbox
          checked={this.props.item.shouldBeSelected}
          onChange={this.handleCheckboxChange}
        />
        <span style={{ marginLeft: 8 }}>
          <ContainerMs1 style={{ marginLeft: 8 }}>
            {this.props.item.code}
          </ContainerMs1>
          <ContainerMs1>{this.props.item.title}</ContainerMs1>
          <ContainerMs1 style={{ marginLeft: 20 }}>
            {this.props.item.shouldHavePermission ? "LUPA" : ""}
          </ContainerMs1>
          <ContainerMs1 style={{ marginLeft: 20 }}>
            {this.props.item.shouldBeRemoved ? "POISTETTU" : ""}
          </ContainerMs1>
          <ContainerMs1 style={{ marginLeft: 20 }}>
            {this.props.item.shouldBeAdded ? "LISÄTTY" : ""}
          </ContainerMs1>
        </span>
      </label>
    );
  }
}

SelectableItem.propTypes = {
  item: PropTypes.object,
  onStatusChange: PropTypes.func
};

export default SelectableItem;
