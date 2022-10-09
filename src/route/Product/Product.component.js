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

  componentDidMount() {
    const product_id = this.props.match.params.product_id;
    const { onGettingProduct, onErrorGettingProduct } = this.props;

    getChosenProduct(product_id)
      .then((result) => {
        const { price, ...restOfProduct } = result["product"];
        const chosenCurrencyPrice = this.findChosenCurrency(price);
        onGettingProduct({
          ...restOfProduct,
          price: chosenCurrencyPrice,
        });
      })
      .catch((error) => onErrorGettingProduct(ERROR));
  }

  render() {
    const { product } = this.props;

    if (product === null) {
      return <h1>Loading ...</h1>;
    } else {
      const { description } = product;
      this.descriptionDiv.insertAdjacentHTML("afterbegin", description);
      const attributes = product.attributes.map((attribute) => (
        <ItemAttributes />
      ));
      return (
        <div id="Product">
          <ItemGallery gallery={product.gallery} />
          <div id="ProductDescription">
            <div id="NameCard">
              <h1>{product.name}</h1>
              <h2>{product.brand}</h2>
            </div>
            {attributes}
            <div id="Price">
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
              <div style={{ fontSize: "130%" }} ref={this.setDescriptionDiv} />
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
