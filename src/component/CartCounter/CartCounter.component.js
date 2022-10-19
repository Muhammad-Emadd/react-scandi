import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../store/cart";
import "./CartCounter.style.scss";
class CartCounter extends PureComponent {
  render() {
    const { item, addProductToCart, removeProductFromCart } = this.props;

    return (
      <div className="CartCount">
        <p onClick={() => addProductToCart(item)}>+</p>
        <p className="CartCount-Count">{item.count}</p>
        <p onClick={() => removeProductFromCart(item)}>-</p>
      </div>
    );
  }
}

const mapDispatchToProps = { addProductToCart, removeProductFromCart };

export default connect(null, mapDispatchToProps)(CartCounter);
