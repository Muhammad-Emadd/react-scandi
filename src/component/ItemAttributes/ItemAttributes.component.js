import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./ItemAttributes.style.scss";

class ItemAttributes extends PureComponent {
  componentDidMount() {
    const {
      onAttributeChange,
      attribute: { id, name, type, items },
    } = this.props;
    const { id: itemID, value, displayValue } = items[0];

    onAttributeChange(id, { name, type, id: itemID, value, displayValue });
  }
  getAttributeChoices = () => {
    const {
      attribute: { id, type, name, items },
      onAttributeChange,
      chosenAttributes,
    } = this.props;

    return items.map(({ id: itemID, value, displayValue }, index) => {
      const checked =
        Object.keys(chosenAttributes).length !== 0 &&
        chosenAttributes[id].id === itemID;
      let choiceItem = null;
      if (type === "text")
        choiceItem = (
          <div
            className={
              checked
                ? "ProductAttributes-SelectedText"
                : "ProductAttributes-Text"
            }
          >
            {value}
          </div>
        );
      else if (type === "swatch") {
        choiceItem = (
          <div
            className={
              checked
                ? "ProductAttributes-SelectedSwatch"
                : "ProductAttributes-Swatch"
            }
            style={{
              backgroundColor: value,
            }}
          />
        );
      }

      return (
        <div
          key={index}
          className="ProductAttributes-ChoiceItem"
          onClick={() =>
            onAttributeChange(id, {
              name,
              type,
              id: itemID,
              value,
              displayValue,
            })
          }
        >
          {choiceItem}
        </div>
      );
    });
  };

  render() {
    const {
      attribute: { name },
    } = this.props;
    const choices = this.getAttributeChoices();

    return (
      <div className="ProductAttributes">
        <h1>{name}:</h1>
        <div className="ProductAttributes-Choices">{choices}</div>
      </div>
    );
  }
}

ItemAttributes.propTypes = {};

export default ItemAttributes;
