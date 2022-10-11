import React, { PureComponent } from "react";
import CartCounter from "../CartCounter";
import CartGallery from "../CartGallery";

class CartItem extends PureComponent {
  findChosenCurrency = (prices) => {
    const { chosenCurrency } = this.props;
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
    const { item } = this.props;
    const { name, brand, attributes, gallery, prices } = item;
    const {
      amount,
      currency: { symbol },
    } = this.findChosenCurrency(prices);

    const selectedAttributes = this.getSelectedAttributes(attributes);

    return (
      <div className="CartItem">
        <div className="CartItem-Description">
          <div className="CartItem-Card">
            <h1>{name}</h1>
            <h2>{brand}</h2>
          </div>
          <div className="Cart-Price">
            <h3>price:</h3>
            <h1>{`${symbol} ${amount}`}</h1>
          </div>
          <div className="CartItem-Attributes">{selectedAttributes}</div>
        </div>
        <CartCounter item={item} />
        <CartGallery />
        {/* <Cart gallery={gallery} /> */}
      </div>
    );
  }
}

export default CartItem;
