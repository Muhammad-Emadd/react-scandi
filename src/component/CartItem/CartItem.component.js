import types from "@testing-library/user-event";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CartCounter from "../CartCounter";
import CartGallery from "../CartGallery";
import "./CartItem.scss";
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
        choiceItem = <div className="CartItem-SelectedText">{value}</div>;
      else if (type === "swatch")
        choiceItem = choiceItem = (
          <div
            className="CartItem-SelectedSwatch"
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
    const page = type === "page" ? true : false;
    const selectedAttributes = this.getSelectedAttributes(attributes);
    const imageUi = page ? (
      <CartGallery gallery={gallery} />
    ) : (
      <img src={gallery[0]} alt="Cart Item image" />
    );

    return (
      <div className={page ? "CartPageItem" : "CartItem"}>
        <button
          className="CartItem-DeleteProduct"
          // onClick={() => deleteFromCart({ id, i: counts[ind].toString() })}
          button="delete"
        >
          &#10007;
        </button>
        <div
          className={page ? "CartPageItem-Description" : "CartItem-Description"}
        >
          <div className={page ? "CartPageItem-Card" : "CartItem-Card"}>
            <h1>{name}</h1>
            <h3>{brand}</h3>
          </div>
          <div className={page ? "CartPageItem-Price" : "CartItem-Price"}>
            <h3>{`${symbol} ${amount}`}</h3>
          </div>
          <div
            className={page ? "CartPageItem-Attributes" : "CartItem-Attributes"}
          >
            {selectedAttributes}
          </div>
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
