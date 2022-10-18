import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CartCounter from "../CartCounter";
import CartGallery from "../CartGallery";

class CartItem extends PureComponent {
  findChosenCurrency = (prices) => {
    const { chosenCurrency } = this.props;
    console.log(prices, chosenCurrency);
    return prices.filter(
      (price) => price.currency.label === chosenCurrency.label
    )[0];
  };
  getSelectedAttributes = (attributes) => {
    const attributeValues = Object.values(attributes);
    return attributeValues.map(({ name, type, value, displayValue }, index) => {
      let choiceItem = null;
      if (type === "text")
        choiceItem = (
          <div className="ProductAttributes-SelectedText">{value}</div>
        );
      else if (type === "swatch")
        choiceItem = choiceItem = (
          <div
            className="ProductAttributes-SelectedSwatch"
            style={{
              backgroundColor: value,
              height: "2em",
            }}
          ></div>
        );

      return (
        <div key={index} id="SelectedAttributes">
          <h1>{name}:</h1>
          <div id="Item">{choiceItem}</div>
        </div>
      );
    });
  };

  render() {
    const {
      item,
      chosenCurrency: { symbol },
    } = this.props;

    const { name, brand, attributes, gallery, prices } = item;
    const { amount } = this.findChosenCurrency(prices);

    const selectedAttributes = this.getSelectedAttributes(attributes);

    return (
      <div className="CartOverlayItem">
        <div className="CartOverlayItem-Description">
          <div className="CartOverlayItem-Card">
            <h1>{name}</h1>
            <h3>{brand}</h3>
          </div>
          <div className="CartOverlayItem-Price">
            <h3>price:</h3>
            <h1>{`${symbol} ${amount}`}</h1>
          </div>
          <div className="CartOverlayItem-Attributes">{selectedAttributes}</div>
        </div>
        <CartCounter item={item} />
        <div className="CartOverlayItem">
          <img src={gallery[0]} alt="Cart Item image" />
        </div>
      </div>
    );
  }
}
const mapStoreStateToProps = ({ currenyReducer }) => {
  return {
    chosenCurrency: currenyReducer.chosenCurrency,
  };
};
export default connect(mapStoreStateToProps, null)(CartItem);
