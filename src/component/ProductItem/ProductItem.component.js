import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { whiteCart } from "../../style/logos";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setProduct } from "../../store/products";

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
    const { label } = this.props;
    const { name, gallery, price, inStock, brand, id } = this.props.product;
    const inStockUi = !inStock ? (
      <div className="ProductCard--unavailable">
        <h1>OUT OF STOCK</h1>
      </div>
    ) : (
      ""
    );
    return (
      <Link
        onClick={() => this.props.setChosenProduct(id)}
        to={`/products/${id}`}
        className="ProductCard"
        style={!inStock ? { opacity: "50%" } : {}}
        onMouseEnter={this.showCartButton}
        onMouseLeave={this.hideCartButton}
      >
        {inStockUi}
        <div className="ProductCard-img">
          <img className="img" src={gallery[0]} alt={"product"} />
        </div>
        <header className="ProductCard-header">
          <h1>
            {name}
            {brand}
          </h1>
          <p>{`${price.amount} ${label}`}</p>
          <div
            className="ProductCard-CartIcon"
            onClick={this.handleCartButton.bind(this)}
          >
            <img src={whiteCart} alt="cart" />
          </div>
        </header>
      </Link>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setChosenProduct: (Product) => dispatch(setProduct(Product)),
  };
};
ProductItem.propTypes = {};

export default connect(null, mapDispatchToProps)(ProductItem);
