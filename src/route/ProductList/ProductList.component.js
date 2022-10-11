import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProductListAPI } from "../../query/ProductList.query";
import ProductItem from "../../component/ProductItem/ProductItem.component";
import { ERROR } from "../../util/constants";
import { getProducts, onErrorGettingProducts } from "../../store/products";
import { withRouter } from "react-router-dom";
import { setCategory } from "../../store/categories";

class ProductList extends PureComponent {
  componentDidMount() {
    const {
      chosenCategory,
      onInitProducts,
      onFetchProductsFail,
      match: { path },
      handleCategory,
    } = this.props;

    let category;
    if (path.substring(1).length > 0) {
      category = path.substring(1);
      handleCategory(category);
    } else category = chosenCategory;

    getProductListAPI(category)
      .then((results) => onInitProducts(results.category.products))
      .catch((error) => onFetchProductsFail(ERROR));
  }
  selectTotalCompletedTodos = (products, action) => {
    const completedTodos = products.filter((product) =>
      product.attributes
        .find((attr) => attr.id === action.key)
        ?.items.some((value) => value.id === action.value)
    );
    return completedTodos;
  };
  findChosenCurrency = (prices) => {
    const { chosenCurrency } = this.props;
    return prices.filter(
      (price) => price.currency.label === chosenCurrency.label
    )[0];
  };

  render() {
    const { chosenCategory, products, chosenCurrency } = this.props;
    console.log(chosenCategory);
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
    handleCategory: (cat) => dispatch(setCategory(cat)),
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
  chosenCategory: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductList));
