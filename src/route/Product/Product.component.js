import React, { PureComponent } from "react";

import { withRouter } from "react-router";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { addProductToCart } from "../../store/cart/cartSlice";
import { getChosenProduct } from "../../query/Product.query";
import { getProduct, onErrorGettingProduct } from "../../store/item/itemSlice";
import { ERROR } from "../../util/constants";
import ItemGallery from "../../component/ItemGallery";
import Scroll from "../../component/Scroll";
import ItemAttributes from "../../component/ItemAttributes/ItemAttributes.component";

class Product extends PureComponent {
  state = { product: null, chosenAttributes: {} };
  descriptionDiv = null;

  setDescriptionDiv = (element) => {
    this.descriptionDiv = element;
  };
  findChosenCurrency = (prices) => {
    const { chosenCurrency } = this.props;
    return prices.filter(
      (price) => price.currency.label === chosenCurrency.label
    )[0];
  };
  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  setAttributes = (id, value) => {
    this.setState((prevState) => {
      const attributes = { ...prevState.selectedAttributes, [id]: value };
      return { selectedAttributes: attributes };
    });
  };
  handleAddingProductToCart = () => {
    const { onAddProductToCart } = this.props;
    const {
      product: { id, name, brand, gallery, prices },
      selectedAttributes: attributes,
    } = this.state;
    onAddProductToCart({ id, name, brand, gallery, prices, attributes });
  };
  descriptionMarkup(description) {
    return { __html: description };
  }

  componentDidMount() {
    const product_id = this.props.match.params.product_id;
    const { onGettingProduct, onErrorGettingProduct } = this.props;

    getChosenProduct(product_id)
      .then((result) => {
        const { prices, ...restOfProduct } = result.product;

        const chosenCurrencyPrice = this.findChosenCurrency(prices);

        onGettingProduct({
          ...restOfProduct,
          price: chosenCurrencyPrice,
        });
      })
      .catch((error) => onErrorGettingProduct(ERROR));
  }

  render() {
    this.scrollToTop();
    const { product } = this.props;

    if (product === null) {
      return <h1>Loading ...</h1>;
    } else {
      const { description } = product;

      const attributes = product.attributes.map((attribute, i) => (
        <ItemAttributes key={i} />
      ));
      return (
        <div className="ProductPage">
          <ItemGallery gallery={product.gallery} />
          <div className="ProductPage-ViewDetails">
            <div className="ProductPage-InfoCard">
              <h1>{product.name}</h1>
              <h2>{product.brand}</h2>
            </div>
            {attributes}
            <div className="ProductPage-Price">
              <h3>price:</h3>
              <h1>pricees</h1>
            </div>
            <button
              disabled={!product.inStock}
              onClick={this.handleAddingProductToCart.bind(this)}
            >
              {product.inStock ? "add to cart" : "out of stock"}
            </button>
            <Scroll maxHeight="15em">
              <div
                dangerouslySetInnerHTML={this.descriptionMarkup(description)}
                className="ProductPage-Description"
                style={{ fontSize: "130%" }}
              ></div>
            </Scroll>
          </div>
        </div>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onGettingProduct: (product) => dispatch(getProduct(product)),
    onErrorGettingProduct: (error) => dispatch(onErrorGettingProduct(error)),
    onAddProductToCart: (product) => dispatch(addProductToCart(product)),
  };
};

const mapStateToProps = ({ productsReducer, currenyReducer, itemReducer }) => {
  return {
    chosenProduct: productsReducer.chosenProduct,
    chosenCurrency: currenyReducer.chosenCurrency,
    product: itemReducer.product,
  };
};
Product.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
