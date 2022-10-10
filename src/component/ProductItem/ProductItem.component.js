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
      <div className="unavailable">
        <h1>OUT OF STOCK</h1>
      </div>
    ) : (
      ""
    );
    return (
      <Link
        onClick={() => this.props.setChosenProduct(id)}
        to={`/products/${id}`}
      >
        <div
          style={!inStock ? { opacity: "50%" } : {}}
          onMouseEnter={this.showCartButton}
          onMouseLeave={this.hideCartButton}
          className="container__card-list__containercard-front"
        >
          {inStockUi}
          <div className="container__card-list__containercard-front-img">
            <img className="img" src={gallery[0]} alt={"product"} />
          </div>
          <header className="container__card-list__containercard-front-card-header">
            <h1>
              {name}
              {brand}
            </h1>
            <p>{`${price.amount} ${label}`}</p>
            <div
              className="cart-icon"
              onClick={this.handleCartButton.bind(this)}
            >
              <img src={whiteCart} alt="cart" />
            </div>
          </header>
        </div>
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
