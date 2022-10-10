import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProductListAPI } from "../../query/ProductList.query";
import ProductItem from "../../component/ProductItem/ProductItem.component";
import { ERROR } from "../../util/constants";
import { getProducts, onErrorGettingProducts } from "../../store/products";

class ProductList extends PureComponent {
  componentDidUpdate(prevProps) {
    const { chosenCategory, onInitProducts, onFetchProductsFail } = this.props;

    if (prevProps.chosenCategory !== chosenCategory)
      getProductListAPI(chosenCategory)
        .then((results) => onInitProducts(results.category.products))
        .catch((error) => onFetchProductsFail(ERROR));
  }

  findChosenCurrency = (prices) => {
    const { chosenCurrency } = this.props;
    return prices.filter(
      (price) => price.currency.label === chosenCurrency.label
    )[0];
  };

  render() {
    const { chosenCategory, products, chosenCurrency } = this.props;
    const productsList = products.length
      ? products.map((product, index) => {
          const { prices, ...productRest } = product;

          const viwedCurrency = this.findChosenCurrency(prices);

          return (
            <ProductItem
              key={index + product.id}
              product={{ ...productRest, price: viwedCurrency }}
              label={chosenCurrency.symbol}
            />
          );
        })
      : null;

    return (
      <div className="ProductList">
        <h1>{chosenCategory}</h1>
        <div>{productsList}</div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onInitProducts: (Products) => dispatch(getProducts(Products)),
    onFetchProductsFail: (err) => dispatch(onErrorGettingProducts(err)),
  };
};

const mapStateToProps = ({
  categoryReducer,
  productsReducer,
  currenyReducer,
}) => {
  return {
    chosenCategory: categoryReducer.chosenCategory,
    products: productsReducer.products,
    chosenCurrency: currenyReducer.chosenCurrency,
  };
};
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
