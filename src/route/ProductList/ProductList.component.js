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

  pricesToObject = (prices) => {
    return prices.reduce((reducedObj, price) => {
      return { ...reducedObj, [price.currency]: price.amount };
    }, {});
  };

  productsMapping = (products) => {
    return products.map((product, index) => {
      const { prices, ...modifiedProduct } = product;
      const pricesObj = this.pricesToObject(prices);
      return (
        <ProductItem
          key={index}
          product={{ ...modifiedProduct, prices: pricesObj }}
        />
      );
    });
  };

  render() {
    const { chosenCategory } = this.props;

    // const productsList = products.length
    //   ? this.productsMapping(products)
    //   : null;

    return (
      <div id="ProductsPage">
        <h1>{chosenCategory}</h1>
        {/* <div id="ProductsList">{productsList}</div> */}
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

const mapStateToProps = ({ categoryReducer, productsReducer }) => {
  return {
    chosenCategory: categoryReducer.chosenCategory,
    products: productsReducer.products,
  };
};
ProductList.propTypes = {
  // products: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.
  products: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
