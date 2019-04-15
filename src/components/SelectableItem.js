import React from "react";
import PropTypes from "prop-types";
import Checkbox from "components/Checkbox";
import { ContainerMs1, Container1 } from "utils/UIComponents";

class SelectableItem extends React.Component {
  constructor() {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSubCheckboxChange = this.handleSubCheckboxChange.bind(this)
  }

  handleCheckboxChange = () => {
    this.props.onChanges(this.props.item);
  };

  handleSubCheckboxChange = () => {
    this.props.onChanges(this.props.item, true);
  };

  render() {
    const layoutClasses = [
      this.props.item.isAdded && "is-added",
      this.props.item.isRemoved && "is-removed",
      this.props.item.isInLupa && "is-in-lupa"
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <div>
        <label className={layoutClasses}>
          <Checkbox
            key={`checkbox-item-${this.props.item.code}`}
            checked={this.props.item.shouldBeSelected}
            onChange={this.handleCheckboxChange}
          />
          <span style={{ marginLeft: 8 }}>
            <ContainerMs1 style={{ marginLeft: 8 }}>
              {this.props.item.code}
            </ContainerMs1>
            <ContainerMs1>{this.props.item.title}</ContainerMs1>
            <ContainerMs1 style={{ marginLeft: 20 }}>
              {this.props.item.isInLupa ? "LUPA" : ""}
            </ContainerMs1>
            <ContainerMs1 style={{ marginLeft: 20 }}>
              {this.props.item.shouldBeRemoved ? "POISTETTU" : ""}
            </ContainerMs1>
            <ContainerMs1 style={{ marginLeft: 20 }}>
              {this.props.item.shouldBeAdded ? "LISÄTTY" : ""}
            </ContainerMs1>
          </span>
        </label>
        {this.props.item.subItems.length > 0 && (
          <Container1>
            <label>
              <Checkbox
                key={`checkbox-sub-item-${this.props.item.code}`}
                checked={this.props.item.subItems[0].shouldBeSelected}
                onChange={this.handleSubCheckboxChange}
              />
              <span style={{ marginLeft: 8 }}>
                <ContainerMs1 style={{ marginLeft: 8 }}>
                  {this.props.item.subItems[0].code}
                </ContainerMs1>
                <ContainerMs1>{this.props.item.subItems[0].title}</ContainerMs1>
              </span>
            </label>
          </Container1>
        )}
      </div>
    );
  }
}

SelectableItem.propTypes = {
  item: PropTypes.object,
  onChanges: PropTypes.func
};

export default SelectableItem;
