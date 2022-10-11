import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../store/cart";

class CartCounter extends PureComponent {
  render() {
    const { item, addProductToCart, removeProductFromCart } = this.props;

    return (
      <div className="CartCount">
        <button onClick={() => addProductToCart(item)}>+</button>
        <div className="CartCount-Count">{item.count}</div>
        <button onClick={() => removeProductFromCart(item)}>-</button>
      </div>
    );
  }
}

const mapDispatchToProps = { addProductToCart, removeProductFromCart };

export default connect(null, mapDispatchToProps)(CartCounter);
