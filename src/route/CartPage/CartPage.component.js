import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CartItem from "../../component/CartItem";
import { connect } from "react-redux";
import "./CartPage.style.scss";

class Cart extends PureComponent {
  render() {
    const { items, itemsCount } = this.props;

    const noItems = itemsCount === 0;
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
        <h1>Cart</h1>
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
          <h2>Total:</h2>
          <h2>Quantity:</h2>

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

Cart.propTypes = {};

const mapStoreStateToProps = ({ cartReducer }) => {
  return {
    items: cartReducer.items,
    itemsCount: cartReducer.itemsCount,
  };
};

export default connect(mapStoreStateToProps)(Cart);
