import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { setBodyOverlay } from "../../store/overlay";
import "./CartMenu.style.scss";
import { toggleCartMenu } from "../../store/cart";
import { blackCart } from "../../style/logos";
import CartItem from "../CartItem";
import Scroll from "../Scroll";
import { Link } from "react-router-dom";
class CartMenu extends PureComponent {
  findChosenCurrency = (currencies) => {
    const { chosenCurrency } = this.props;
    currencies.filter((currency) => currency === chosenCurrency.label);
    return currencies.filter((currency) => currency === chosenCurrency.label);
  };

  handleMenu = (bool) => {
    const { setBodyOverlay, handleToggleMenu } = this.props;
    setBodyOverlay(!bool);
    handleToggleMenu(!bool);
  };

  render() {
    const { items, itemsCount, showCartMenu, totalPrice, chosenCurrency } =
      this.props;
    const cartItems = items.map((item, index) => {
      return <CartItem type="dropDown" key={index} item={item} />;
    });
    const currencies = Object.keys(totalPrice);
    const totalUi = currencies.length
      ? this.findChosenCurrency(currencies)[0]
      : 0;
    const chosedSymbol = chosenCurrency ? chosenCurrency.symbol : "";
    const total = currencies.length
      ? (Math.round(totalPrice[totalUi] * 100) / 100).toFixed(2)
      : 0;
    const itemCountUi =
      itemsCount === 1 ? `${itemsCount} item` : `${itemsCount} items`;
    return (
      <div className="CartMenu">
        <div
          className="CartMenu-Img"
          onClick={() => this.handleMenu(showCartMenu)}
        >
          <img src={blackCart} alt="Cart Menu" />
          <div
            className={
              itemsCount ? "CartMenu-Counter" : "CartMenu-Counter--Disable"
            }
          >
            {itemsCount}
          </div>
        </div>
        <div
          className={
            showCartMenu ? "CartMenu-Dropdown" : "CartMenu-Dropdown--Disable"
          }
        >
          <div className="CartMenu-Title">
            <strong>My Bag</strong>, {itemCountUi}
          </div>
          <div
            className={
              cartItems.length > 0
                ? "CartMenu-Items"
                : "CartMenu-Items--Disable"
            }
          >
            <Scroll maxHeight="40rem">{cartItems}</Scroll>
          </div>
          <div
            className={
              itemsCount ? "CartMenu-Total" : "CartMenu-Total--Disable"
            }
          >
            <h2>Total </h2>
            <p>
              {chosedSymbol} {total}
            </p>
          </div>
          <div className="CartButtons">
            <Link to={`/cart`}>
              <button className="CartButtons-ViewBag">view bag</button>
            </Link>
            <button className="CartButtons-Checkout" disabled>
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
    handleToggleMenu: (bool) => dispatch(toggleCartMenu(bool)),
    setBodyOverlay: (bool) => dispatch(setBodyOverlay(bool)),
  };
};

export default connect(mapStoreStateToProps, mapDispatchToProps)(CartMenu);
