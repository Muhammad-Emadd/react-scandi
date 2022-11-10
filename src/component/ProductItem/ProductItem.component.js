import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { whiteCart } from "../../style/logos";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setProduct } from "../../store/products";
import "./ProductItem.style.scss";
import { addProductToCart } from "../../store/cart";

class ProductItem extends PureComponent {
  findChosenCurrency = (prices) => {
    const { chosenCurrency } = this.props;
    return prices.filter(
      (price) => price.currency.label === chosenCurrency.label
    )[0];
  };
  handleCartButton = (event) => {
    event.preventDefault();
    const {
      product: { attributes, ...rest },
      onAddingToCart,
    } = this.props;

    const defaultAttributes = Object.values(attributes).reduce(
      (prevAttributes, { id, name, type, items }) => {
        const othersAttributes = items.slice(1);
        return {
          [id]: { name, type, ...items[0], othersAttributes },
          ...prevAttributes,
        };
      },
      {}
    );

    console.log(defaultAttributes);

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
      setChosenProduct,
      product: { name, gallery, prices, inStock, brand, id },
      chosenCurrency: { symbol },
    } = this.props;

    const { amount } = this.findChosenCurrency(prices);
    const amountUi = (Math.round(amount * 100) / 100).toFixed(2);
    const inStockUi = !inStock ? (
      <div className="ProductCard--unavailable">
        <h1>OUT OF STOCK</h1>
      </div>
    ) : null;

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
              {name} {brand}
            </h1>
          </Link>
          <p>{`${amountUi} ${symbol}`}</p>
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
    onAddingToCart: (Product) => dispatch(addProductToCart(Product)),
  };
};
const mapStateToProps = ({ currenyReducer }) => {
  return {
    chosenCurrency: currenyReducer.chosenCurrency,
  };
};
ProductItem.propTypes = {
  chosenCurrency: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
