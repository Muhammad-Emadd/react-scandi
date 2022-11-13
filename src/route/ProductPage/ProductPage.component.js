import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { addProductToCart } from "../../store/cart/cartSlice";
import { getChosenProduct } from "../../query/Product.query";
import { getProduct, onErrorGettingProduct } from "../../store/item/itemSlice";
import { ERROR } from "../../util/constants";
import ItemGallery from "../../component/ItemGallery";
import Scroll from "../../component/Scroll";
import ItemAttributes from "../../component/ItemAttributes/ItemAttributes.component";
import "./ProductPage.style.scss";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { chosenAttributes: {}, product: null, descriptionSet: false };
  }

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
    const allAttributes = this.props.product.attributes.filter(
      (attribute) => attribute.id === id
    )[0].items;

    this.setState((prevState) => {
      const attributes = {
        ...prevState.chosenAttributes,
        [id]: { ...value, allAttributes },
      };
      return { chosenAttributes: attributes };
    });
    console.log(this.state);
  };

  handleAddingProductToCart = () => {
    const { chosenAttributes: attributes } = this.state;
    const {
      product: { id, name, brand, gallery, prices },
      onAddProductToCart,
    } = this.props;
    console.log(this.props.product, attributes);

    onAddProductToCart({ id, name, brand, gallery, prices, attributes });
  };

  componentDidMount() {
    const product_id = this.props.match.params.product_id;
    const { onGettingProduct, onErrorGettingProduct } = this.props;

    getChosenProduct(product_id)
      .then((result) => {
        this.setState({ product: product_id }, () => {
          if (this.props?.product && this.state.descriptionSet === false) {
            this.myRef?.current?.insertAdjacentHTML(
              "afterbegin",
              this.props.product.description
            );
            this.setState({ descriptionSet: true });
            console.log(this.myRef.current, this.props?.product?.description);
          }
        });
        onGettingProduct(result.product);
      })
      .catch(() => onErrorGettingProduct(ERROR));
  }
  render() {
    const { product } = this.props;
    this.scrollToTop();
    if (!this.state.product) {
      return <h1>Loading ...</h1>;
    } else {
      const { prices, name, brand, gallery, inStock, attributes } = product;
      const {
        amount,
        currency: { symbol },
      } = this.findChosenCurrency(prices);

      const attributesUi = attributes.map((attribute, i) => {
        return (
          <ItemAttributes
            key={i + attribute.id}
            attribute={attribute}
            chosenAttributes={this.state.chosenAttributes}
            onAttributeChange={this.setAttributes.bind(this)}
          />
        );
      });

      return (
        <div className="ProductPage">
          <ItemGallery gallery={gallery} />
          <div className="ProductPage-Details">
            <div className="ProductPage-InfoCard">
              <h1>{name}</h1>
              <h2>{brand}</h2>
            </div>
            {attributesUi}
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
            <Scroll>
              <div ref={this.myRef} className="ProductPage-Description" />
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

const mapStateToProps = ({ currenyReducer, itemReducer }) => {
  return {
    chosenCurrency: currenyReducer.chosenCurrency,
    product: itemReducer.product,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
