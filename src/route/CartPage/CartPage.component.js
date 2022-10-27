import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CartItem from "../../component/CartItem";
import { connect } from "react-redux";
import "./CartPage.style.scss";

class Cart extends PureComponent {
  findChosenCurrency = (currencies) => {
    const { chosenCurrency } = this.props;
    currencies.filter((currency) => currency === chosenCurrency.label);
    return currencies.filter((currency) => currency === chosenCurrency.label);
  };

  render() {
    const { items, itemsCount, totalPrice, chosenCurrency } = this.props;
    const currencies = Object.keys(totalPrice);
    const totalUi = currencies.length
      ? this.findChosenCurrency(currencies)[0]
      : 0;
    const noItems = itemsCount === 0;
    const chosedSymbol = chosenCurrency ? chosenCurrency.symbol : "";
    const total = currencies.length
      ? Math.round(totalPrice[totalUi] * 100) / 100
      : 0;
    const cartItems = items.map((item, index) => {
      return (
        <div key={index} className="CartPage-ItemWrapper">
          <hr />
          <CartItem type="page" item={item} />
        </div>
      );
    });

    return (
      <div className="CartPage">
        <h2 className="CartPage-Title">Cart</h2>
        <h2
          className={
            noItems ? "CartPage-NoItems" : "CartPage-NoItems--Deactivate"
          }
        >
          No
          <br />
          Shopping Items
        </h2>
        {cartItems}
        <hr />
        <div className="CartPage-TotalPrice">
          <h2>Tax :</h2>
          <h2>
            Total : {chosedSymbol} {total}
          </h2>
          <h2>Quantity: {itemsCount} </h2>

          <button
            className="CartPage-Checkout"
            disabled={noItems}
            onClick={() => {}}
          >
            checkout
          </button>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPrice: PropTypes.object.isRequired,
};

const mapStoreStateToProps = ({ cartReducer, currenyReducer }) => {
  return {
    items: cartReducer.items,
    itemsCount: cartReducer.itemsCount,
    totalPrice: cartReducer.totalPrice,
    chosenCurrency: currenyReducer.chosenCurrency,
  };
};

export default connect(mapStoreStateToProps)(Cart);
