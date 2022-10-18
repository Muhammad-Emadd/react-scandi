import types from "@testing-library/user-event";
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
          <div className="CartItem-SelectedAttributes-Text">{value}</div>
        );
      else if (type === "swatch")
        choiceItem = choiceItem = (
          <div
            className="CartItem-SelectedAttributes-Swatch"
            style={{
              backgroundColor: value,
              height: "2em",
            }}
          ></div>
        );

      return (
        <div key={index} id="CartItem-SelectedAttributes">
          <h1>{name}:</h1>
          <div>{choiceItem}</div>
        </div>
      );
    });
  };

  render() {
    const {
      item,
      type,
      chosenCurrency: { symbol },
    } = this.props;

    const { name, brand, attributes, gallery, prices } = item;
    const { amount } = this.findChosenCurrency(prices);

    const selectedAttributes = this.getSelectedAttributes(attributes);
    const imageUi =
      type === "page" ? (
        <CartGallery gallery={gallery} />
      ) : (
        <div className="CartItem">
          <img src={gallery[0]} alt="Cart Item image" />
        </div>
      );

    return (
      <div className="CartItem">
        <button
          className="CartItem-DeleteProduct"
          // onClick={() => deleteFromCart({ id, i: counts[ind].toString() })}
          button="delete"
        >
          &#10007;
        </button>
        <div className="CartItem-Description">
          <div className="CartItem-Card">
            <h1>{name}</h1>
            <h3>{brand}</h3>
          </div>
          <div className="CartItem-Price">
            <h3>price:</h3>
            <h1>{`${symbol} ${amount}`}</h1>
          </div>
          <div className="CartItem-Attributes">{selectedAttributes}</div>
        </div>
        <CartCounter item={item} />
        {imageUi}
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
