import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setBodyOverlay } from "../../store/body_overlay";
import "./CartMenu.style.css";
import { toggleCartMenu } from "../../store/cart";

class CartMenu extends PureComponent {
  handleMenu = (bool) => {
    setBodyOverlay();
    handleToggleMenu();
  };

  render() {
    return;
  }
}

const mapStoreStateToProps = ({ cartReducer }) => {
  return {
    items: cartReducer.items,
    itemsCount: cartReducer.itemsCount,
    showCartMenu: cartReducer.showCartMenu,
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
