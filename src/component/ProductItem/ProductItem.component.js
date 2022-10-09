import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { whiteCart } from "../../style/logos";
import { NavLink } from "react-router-dom";

class ProductItem extends PureComponent {
  handleCartButton = (event) => {
    event.preventDefault();
    const { product, onAddingToCart } = this.props;
    const { attributes, ...rest } = product;
    const defaultAttributes = Object.values(attributes).reduce(
      (prevAttributes, { id, name, type, items }) => {
        return { [id]: { name, type, ...items[0] }, ...prevAttributes };
      },
      {}
    );

    onAddingToCart({ ...rest, attributes: defaultAttributes });
  };
  showCartButton = (e) => {
    if (this.props.product.inStock) {
      const cardContainer = e.target.closest(
        ".container__card-list__containercard-front"
      );
      cardContainer.querySelector(".cart-icon").classList.add("display");
      cardContainer.classList.add("cart-btn-hover");
    }
  };
  render() {
    console.log(this.props.product);
    // const { symbol, label } = this.props.choosedCurr;
    const { name, gallery, price, inStock, brand, id } = this.props.product;

    return (
      <NavLink to={"/products/" + id}>
        <div
          style={!inStock ? { opacity: "50%" } : {}}
          onMouseEnter={this.showCartButton}
          onMouseLeave={this.hideCartButton}
          className="container__card-list__containercard-front"
        >
          {!inStock ? (
            <div className="unavailable">
              <h1>OUT OF STOCK</h1>
            </div>
          ) : (
            ""
          )}
          <div className="container__card-list__containercard-front-img">
            <img className="img" src={gallery[0]} alt={"product"} />
          </div>
          <header className="container__card-list__containercard-front-card-header">
            <h1>
              {name}
              {brand}
            </h1>
            <p>
              {/* {symbol}  */}
              {price.amount}
            </p>
            <div className="cart-icon" onClick={this.openCardBack}>
              <img src={whiteCart} alt="cart" />
            </div>
          </header>
        </div>
      </NavLink>
    );
  }
}

ProductItem.propTypes = {};

export default ProductItem;
