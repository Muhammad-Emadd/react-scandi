import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart";

class CartCounter extends PureComponent {
  render() {
    const { item, addToCart, removeFromCart } = this.props;

    return (
      <div className="CartCount">
        <button onClick={() => addToCart(item)}>+</button>
        <div className="CartCount-Count">{item.count}</div>
        <button onClick={() => removeFromCart(item)}>-</button>
      </div>
    );
  }
}

const mapDispatchToProps = { addToCart, removeFromCart };

export default connect(null, mapDispatchToProps)(CartCounter);
