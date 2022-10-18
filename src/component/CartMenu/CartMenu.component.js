import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setBodyOverlay } from "../../store/overlay";
import "./CartMenu.style.scss";
import { toggleCartMenu } from "../../store/cart";
import { blackCart } from "../../style/logos";
import CartItem from "../CartItem";
class CartMenu extends PureComponent {
  findChosenCurrency = (prices) => {
    const { chosenCurrency } = this.props;
    console.log(prices, chosenCurrency);
    return prices.filter(
      (price) => price.currency.label === chosenCurrency.label
    )[0];
  };
  handleMenu = (bool) => {
    const { setBodyOverlay, handleToggleMenu } = this.props;
    setBodyOverlay(bool);
    handleToggleMenu(!bool);
  };

  render() {
    const { history, items, itemsCount, showCartMenu, totalPrice } = this.props;
    const cartItems = items.map((item, index) => {
      return <CartItem key={index} item={item} />;
    });

    const roralm =
      // totalPrice.length
      // ? this.findChosenCurrency(totalPrice)
      // :
      null;
    console.log(roralm);

    return (
      <div className="CartMenu" onMouseLeave={() => this.handleMenu(false)}>
        <button
          className="CartMenu-Button"
          onClick={() => this.handleMenu(!showCartMenu)}
        >
          <img src={blackCart} alt="Cart Menu" />
          <div
            className={
              itemsCount ? "CartMenu-Counter" : "CartMenu-Counter--Disable"
            }
          >
            {itemsCount}
          </div>
        </button>
        <div
          className={
            !showCartMenu ? "CartMenu-Dropdown" : "CartMenu-Dropdown--Disable"
          }
        >
          <div className="CartMenu-Title">
            <b>My Bag</b>, {itemsCount} items
          </div>
          <div className="CartMenu-Items">{cartItems}</div>
          <div
            className={
              itemsCount ? "CartMenu-Total" : "CartMenu-Total--disable"
            }
          >
            <h2>Total</h2>
            <div className="CartMenu-TotalPrice">{5}</div>
          </div>
          <div className="CartButtons">
            <button
              className="CartButtons-ViewBag"
              onClick={() => history.push("/cart")}
            >
              view bag
            </button>
            <button className="CartButtons-Checkout" disabled={itemsCount}>
              checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreStateToProps = ({ cartReducer, currenyReducer }) => {
  return {
    items: cartReducer.items,
    itemsCount: cartReducer.itemsCount,
    showCartMenu: cartReducer.showCartMenu,
    totalPrice: cartReducer.totalPrice,
    chosenCurrency: currenyReducer.chosenCurrency,
  };
};

CartMenu.propTypes = {};

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleMenu: () => dispatch(toggleCartMenu()),
    setBodyOverlay: (bool) => dispatch(setBodyOverlay(bool)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapDispatchToProps
)(withRouter(CartMenu));
