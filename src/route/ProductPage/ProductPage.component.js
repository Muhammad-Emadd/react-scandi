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
  state = { chosenAttributes: {} };

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
    const { selectedAttributes: attributes } = this.state;
    const {
      product: { id, name, brand, gallery, prices },
      onAddProductToCart,
    } = this.props;
    onAddProductToCart({ id, name, brand, gallery, prices, attributes });
  };
  descriptionMarkup(description) {
    return { __html: description };
  }

  componentDidMount() {
    const product_id = this.props.match.params.product_id;
    const { onGettingProduct, onErrorGettingProduct } = this.props;

    getChosenProduct(product_id)
      .then((result) => onGettingProduct(result.product))
      .catch((error) => onErrorGettingProduct(ERROR));
  }

  render() {
    this.scrollToTop();
    const { product } = this.props;
    if (product === null) {
      return <h1>Loading ...</h1>;
    } else {
      const { description, prices, name, brand, gallery, inStock } = product;
      const {
        amount,
        currency: { symbol },
      } = this.findChosenCurrency(prices);
      console.log(this.findChosenCurrency(prices));

      const attributes = product.attributes.map((attribute, i) => (
        <ItemAttributes
          key={i + attribute.id}
          attribute={attribute}
          chosenAttributes={this.state.chosenAttributes}
          onAttributeChange={this.setAttributes.bind(this)}
        />
      ));
      return (
        <div className="ProductPage">
          <ItemGallery gallery={gallery} />
          <div className="ProductPage-ViewDetails">
            <div className="ProductPage-InfoCard">
              <h1>{name}</h1>
              <h2>{brand}</h2>
            </div>
            {attributes}
            <div className="ProductPage-Price">
              <h3>price:</h3>
              <h1>{`${symbol} ${amount}`}</h1>
            </div>
            <button
              disabled={!inStock}
              onClick={this.handleAddingProductToCart.bind(this)}
            >
              {inStock ? "add to cart" : "out of stock"}
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
