import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CartCounter from "../CartCounter";
import CartGallery from "../CartGallery";
import "./CartItem.scss";

class CartItem extends PureComponent {
  findChosenCurrency = (prices) => {
    const { chosenCurrency } = this.props;

    return prices.filter(
      (price) => price.currency.label === chosenCurrency.label
    )[0];
  };
  getSelectedAttributes = (attributes) => {
    const { type } = this.props;
    const page = type === "page" ? true : false;
    const attributeValues = Object.values(attributes);
    return attributeValues.map(
      ({ id, name, type, value, allAttributes }, index) => {
        let choiceItem = null;
        if (type === "text") {
          choiceItem = allAttributes.map((attribute, i) => {
            if (attribute.id === id) {
              return (
                <div
                  key={i + attribute.id}
                  className={
                    page
                      ? "CartPageItem-AttributeText--Selected"
                      : "CartItem-AttributeText--Selected"
                  }
                >
                  <span>{attribute.value}</span>
                </div>
              );
            } else {
              return (
                <div
                  key={i + attribute.id}
                  className={
                    page
                      ? "CartPageItem-AttributeText"
                      : "CartItem-AttributeText"
                  }
                >
                  <span>{attribute.value}</span>
                </div>
              );
            }
          });
        } else if (type === "swatch")
          choiceItem = allAttributes.map((attribute, i) => {
            if (attribute.id === id) {
              return (
                <div
                  key={i + attribute.id}
                  className={
                    page
                      ? "CartPageItem-AttributeSwatch--Selected"
                      : "CartItem-AttributeSwatch--Selected"
                  }
                  style={{
                    backgroundColor: attribute.value,
                  }}
                ></div>
              );
            } else {
              return (
                <div
                  key={i + attribute.id}
                  className={
                    page
                      ? "CartPageItem-AttributeSwatch"
                      : "CartItem-AttributeSwatch"
                  }
                  style={{
                    backgroundColor: attribute.value,
                  }}
                ></div>
              );
            }
          });

        return (
          <div
            key={index}
            className={
              page
                ? "CartPageItem-SelectedAttributes"
                : "CartItem-SelectedAttributes"
            }
          >
            <h1>{name}:</h1>
            <div
              className={
                page
                  ? "CartPageItem-AttributeLayout"
                  : "CartItem-AttributeLayout"
              }
            >
              {choiceItem}
            </div>
          </div>
        );
      }
    );
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
      <img src={gallery[0]} alt="Cart Item " />
    );

    return (
      <div className={page ? "CartPageItem" : "CartItem"}>
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
export default connect(mapStoreStateToProps)(CartItem);
