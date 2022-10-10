import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CartItem from "../../component/CartItem";
import { connect } from "react-redux";

class Cart extends PureComponent {
  render() {
    const { items, itemsCount } = this.props;

    const noItems = itemsCount === 0;
    const cartItems = items.map((item, index) => {
      return (
        <div key={index} id="CartItemWrapper">
          <hr />
          <CartItem item={item} />
        </div>
      );
    });

    return (
      <div className="Cart">
        <h1>Cart</h1>
        <h2 className={noItems ? "Cart-NoItems" : "Cart-Deactivate"}>
          No
          <br />
          Shopping Items
        </h2>
        {cartItems}
        <hr />
        <div className="Cart-TotalPrice">
          <h2>Total:</h2>

          <button
            className="Cart-Checkout"
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
