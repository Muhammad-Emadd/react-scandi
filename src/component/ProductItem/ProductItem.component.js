import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { whiteCart } from "../../style/logos";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setProduct } from "../../store/products";
import "./Product.style.scss";

class ProductItem extends PureComponent {
  handleCartButton = (event) => {
    event.preventDefault();
    const {
      product: { attributes, ...rest },
      onAddingToCart,
    } = this.props;

    const defaultAttributes = Object.values(attributes).reduce(
      (prevAttributes, { id, name, type, items }) => {
        return { [id]: { name, type, ...items[0] }, ...prevAttributes };
      },
      {}
    );

    onAddingToCart({ ...rest, attributes: defaultAttributes });
  };

  showCartButton = (e) => {
    const {
      product: { inStock },
    } = this.props;

    if (inStock) {
      const cardContainer = e.target.closest(".ProductCard");
      cardContainer
        .querySelector(".ProductCard-CartIcon")
        .classList.add("display");
      cardContainer.classList.add("ProductCard--hover");
    }
  };
  hideCartButton = (e) => {
    const {
      product: { inStock },
    } = this.props;

    if (inStock) {
      const cardContainer = e.target.closest(".ProductCard");
      cardContainer
        .querySelector(".ProductCard-CartIcon")
        .classList.remove("display");
      cardContainer.classList.remove("ProductCard--hover");
    }
  };

  render() {
    const {
      label,
      setChosenProduct,
      product: { name, gallery, price, inStock, brand, id },
    } = this.props;
    const inStockUi = !inStock ? (
      <div className="ProductCard--unavailable">
        <h1>OUT OF STOCK</h1>
      </div>
    ) : (
      ""
    );

    return (
      <div
        onClick={() => setChosenProduct(id)}
        className="ProductCard"
        style={!inStock ? { opacity: "50%" } : {}}
        onMouseEnter={this.showCartButton}
        onMouseLeave={this.hideCartButton}
      >
        <Link to={`/products/${id}`}>
          {inStockUi}
          <div className="ProductCard-Img">
            <img className="img" src={gallery[0]} alt={"product"} />
          </div>
        </Link>
        <header className="ProductCard-Header">
          <Link to={`/products/${id}`}>
            <h1>
              {name}
              {brand}
            </h1>
          </Link>
          <p>{`${price.amount} ${label}`}</p>
          <div
            className="ProductCard-CartIcon"
            onClick={this.handleCartButton.bind(this)}
          >
            <img src={whiteCart} alt="cart" />
          </div>
        </header>
      </div>
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
